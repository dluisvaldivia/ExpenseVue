# Expense Vue
Your financial management companion!

ExpenseVue is a simple and intuitive platform that allows users to track their income and expenses, create personalized budgets, and monitor their financial health—all in one place.

🌟 Key Features
---
Robust Backend: Powered by Python and Flask, our backend provides a reliable and scalable server to support all operations.
Responsive Design: Fully optimized for use on any device—mobile, tablet, or desktop.
Dynamic User Interface: Sleek and modern UI for an enhanced user experience.
Global State Management: Efficient state handling using Flux.
Reliable Database: Built with SQLAlchemy for secure and robust data management.
Bank Data Integration: Seamless integration of banking data, including transfers, through Yapily API.

## 🚀 Technologies Used
### Frontend
- **HTML5**: Semantic content structure.
- **CSS3**: Custom styles for a responsive design.
- **Bootstrap**: Quick components and responsive grid systems.
- **JavaScript**: Interactivity and client-side logic.
- **React.js**: Reusable components and state management with Flux.

### Backend
- **Python**: Server-side logic and data handling.
- **Flask**: Framework for routing, authentication, and database connections.
- **APIs**: Integration of external services, such as bank data and transfers via Yapily.
### State & Data Management
- **Flux**: Global state management.
- **Custom APIs**: Handling transactions, budgets, and expenses securely.



### **Important note for the database and the data inside it**

edit ```commands.py``` file inside ```/src/api``` folder. Edit line 32 function ```insert_test_data``` to insert the data according to your model (use the function ```insert_test_users``` above as an example). Then, all you need to do is run ```pipenv run insert-test-data```.
### Backend Populate Table Users
To insert test users in the database execute the following command:

```sh
$ flask insert-test-users 5
```
And you will see the following message:
```
  Creating test users
  test_user1@test.com created.
  test_user2@test.com created.
  test_user3@test.com created.
  test_user4@test.com created.
  test_user5@test.com created.
  Users created successfully!
```

# 🤝 Collaborators
- [Danny Valdivia](https://github.com/dluisvaldivia)
- [Monica Solines](https://github.com/monicasolines)
- [Ana Paez](https://github.com/AnaPaez89)
- [Joni Santos](https://github.com/JoniXSantos)
