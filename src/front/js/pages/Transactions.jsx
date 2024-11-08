import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import '../../styles/transactions.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowUp, faCircleArrowDown, faBuildingColumns, faTrashCan, faCreditCard, faMoneyBills, faPen } from '@fortawesome/free-solid-svg-icons';
import { Spinner } from "../component/Spinner.jsx";
import { TransactionsChart } from "../component/BalanceChart.jsx";
import { useNavigate } from "react-router-dom";

export const Transactions = () => {
	const { store, actions } = useContext(Context);
	const [name, setName] = useState('')
	const [type, setType] = useState('')
	const [category, setCategory] = useState('')
	const [source, setSource] = useState('')
	const [description, setDescription] = useState('')
	const [amount, setAmount] = useState('')
	const [date, setDate] = useState('')
	const navigate = useNavigate();

	
	const handleSubmit = (event) => {
		event.preventDefault();

		const transactionData = {
			name: name,
			type: type,
			category: category,
			source: source,
			description: description,
			amount: parseFloat(amount),
			date: date,
		}
		console.log("Datos enviados:", transactionData);
		console.log("este es token:", store.token);
		actions.createTransaction(transactionData)

		const modal = document.getElementById("NewTransactionModal");
		if (modal) {
			const bootstrapModal = window.bootstrap.Modal.getInstance(modal);
			if (bootstrapModal) bootstrapModal.hide();
		}

		setName('');
		setType('');
		setDescription('');
		setAmount('');
		setDate('');
		setCategory('');
		setSource('');
		navigate('/transactions')
	}

	const deleteTransaction = (id) => {
		actions.deleteTransaction(id);
	}

	const formatDate = (date) => {
        const parsedDate = new Date(date);
        const year = parsedDate.getFullYear();
        const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
        const day = String(parsedDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`; 
    };

	const editTransaction = async (item) => {
		const itemEdited = {
			name: item.name,
			type: item.type,
			category: item.category.id,
			source: item.source.id,
			description: item.description,
			amount: parseFloat(item.amount),
			date: formatDate(item.date),
		}
		actions.setCurrentTransaction(itemEdited)
		console.log("this is the data to send to current transaction:", itemEdited)
		navigate('/edit-transaction');
	}

	return (
		<div className="transactions-container">
			<div>
				<header className="transactions-header">
					<div className="container my-4">
						<div className="row align-items-center">
							<div className="col">
								<h2>Transactions</h2>
								<p>Welcome to your transactions</p>
							</div>
							<div className="col-auto">
								<button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#NewTransactionModal" style={{ backgroundColor: '#2D3748', color: '#E2E8F0' }}>New Transaction</button>
								<div className="modal fade" id="NewTransactionModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
									<div className="modal-dialog">
										<div className="modal-content">
											<div className="modal-header">
												<h5 className="modal-title" id="exampleModalLabel" >New Transaction</h5>
												<button type="reset" className="btn-close" data-bs-dismiss="modal" aria-label="Close" style={{ backgroundColor: '#2D3748', color: '#E2E8F0' }}></button>
											</div>
											<div className="modal-body">
												<form onSubmit={handleSubmit}>
													<div className="form-outline mb-4">
														<label className="form-label" htmlFor="registerName">Name</label>
														<input
															type="text"
															id="name"
															name="name"
															className="form-control"
															value={name}
															onChange={(event) => setName(event.target.value)}
														/>
													</div>
													<div className="form-outline mb-4">
														<label className="form-label" htmlFor="registerType">Type of Transaction</label>
														<select className="form-select" aria-label="Default select example" value={type}
															onChange={(event) => setType(event.target.value)}>
															<option value="">Choose a type of Transaction</option>
															<option value="expense">expense</option>
															<option value="income">income</option>
														</select>
													</div>
													<div className="form-outline mb-4">
														<label className="form-label" htmlFor="registerCategory">Category:</label>
														<select className="form-select" aria-label="Default select example" value={category} onChange={(e) => setCategory(e.target.value)}>
															<option value="">Select a category</option>
															{store.categories && store.categories.map((cat) => (
																<option key={cat.id} value={cat.id}>{cat.name}</option>
															))}
														</select>
													</div>
													<div className="form-outline mb-4">
														<label className="form-label" htmlFor="registerCategory">Source:</label>
														<select className="form-select" aria-label="Default select example" value={source} onChange={(e) => setSource(e.target.value)}>
															<option value="">Select a source</option>
															{store.sources && store.sources.map((source) => (
																<option key={source.id} value={source.id}>{source.name}</option>
															))}
														</select>
													</div>
													<div className="form-outline mb-4">
														<label className="form-label">Description:</label>
														<textarea
															className="form-control textarea"
															name="description"
															aria-label="With textarea"
															value={description}
															onChange={(event) => setDescription(event.target.value)}
														/>
													</div>
													<div className="form-outline mb-4">
														<label className="form-label" htmlFor="registerAmount">Amount</label>
														<input
															type="text"
															id="amount"
															name="amount"
															className="form-control"
															value={amount}
															onChange={(event) => setAmount(event.target.value)}
														/>
													</div>
													<div className="form-outline mb-4">
														<label className="form-label" htmlFor="registerDate">Date</label>
														<input
															type="date"
															id="date"
															name="date"
															className="form-control"
															value={date}
															onChange={(event) => setDate(event.target.value)}
															required />
													</div>
													<div className="modal-footer">
														<button type="submit" className="btn" style={{ backgroundColor: '#2D3748', color: '#E2E8F0' }}>Create Transaction</button>
													</div>
												</form>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="card mb-2">
						{!store.balance || Object.keys(store.balance).length === 0 ? <div className="m-3"> <Spinner /> </div> :
							(<div className="card-body d-flex flex-row align-items-center justify-content-center">
								<div className="stat me-3 d-flex flex-row align-items-center justify-content-center">
									<div className="m-3">
										<FontAwesomeIcon icon={faCircleArrowUp} style={{ color: "#3eac65", fontSize: "2rem" }} />
									</div>
									<div >
										<p> Income <br />
											€{store.balance.monthly_income}</p>
									</div>
								</div>
								<div className="stat me-3 d-flex flex-row  align-items-center justify-content-center">
									<div className="m-3">
										<FontAwesomeIcon icon={faCircleArrowDown} style={{ color: "#ea1a2f", fontSize: "2rem" }} />
									</div>
									<div >
										<p> Expenses <br />
											€{store.balance.monthly_expenses}</p>
									</div>
								</div>
								<div className="stat me-3 d-flex flex-row  align-items-center justify-content-center">
									<div className="m-3">
										<p> Balance <br />
											€{store.balance.total_balance}</p>
									</div>
								</div>
							</div>)}
					</div>
				</header>
				<TransactionsChart />
				<div className="transactions-list card p-3">
					<table>
						<thead>
							<tr>
								<th>Transaction</th>
								<th>Type</th>
								<th>Date</th>
								<th>Amount</th>
							</tr>
						</thead>
						<tbody>
							{!store.transactions || store.transactions.length === 0 ? (
								<tr>
									<td colSpan="4" >  <div className="m-3"> <Spinner />  </div></td>
								</tr>
							) : (
								store.transactions.map((item, index) => (
									<tr key={item.id}>
										<td>{item.name}</td>
										<td>
											{(() => {
												switch (item.source.type_source) {
													case 'bank_account':
														return <FontAwesomeIcon icon={faBuildingColumns} />;
													case 'credit_card':
														return <FontAwesomeIcon icon={faCreditCard} />;
													case 'debit_card':
														return <FontAwesomeIcon icon={faCreditCard} />;
													case 'manual_entry':
														return <FontAwesomeIcon icon={faMoneyBills} />;
													default:
														return null;
												}
											})()}
										</td>
										<td>{item.date}</td>
										<td className="amount">
											{item.type === 'income' ? `€${item.amount}` : `-€${item.amount}`}
										</td>

										<td> {item.source.type_source === 'manual_entry' ? <button type="button" onClick={() => editTransaction(item)} className="btn"> <FontAwesomeIcon icon={faPen} /> </button> : <FontAwesomeIcon icon={faPen} className="d-none" />}</td>

										<td> {item.source.type_source === 'manual_entry' ? <button type="button" className="btn" onClick={() => deleteTransaction(item.id)}> <FontAwesomeIcon icon={faTrashCan} /> </button> : <FontAwesomeIcon icon={faPen} className="d-none" />}</td>
									</tr>

								))
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};
