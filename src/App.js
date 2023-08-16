// import { useState, useReducer } from "react";
// import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
// import ExpenseInfo from "./components/ExpenseInfo/ExpenseInfo";
// import ExpenseList from "./components/ExpenseList/ExpenseList";
// import "./App.css";

// const reducer = (state, action) => {
//   const { payload } = action;
//   switch (action.type) {
//     case "ADD_EXPENSE": {
//       return {
//         expenses: [payload.expense, ...state.expenses]
//       };

//     }
//     case "REMOVE_EXPENSE": {
//       return {
//         expenses: state.expenses.filter((expense) => expense.id !== payload.id)
//       };
//     }
//     case "EDIT_EXPENSE":{
//       return{

//       }
//     }
//     default:
//       return state;
//   }
// };

// function App() {
//   const [state, dispatch] = useReducer(reducer, { expenses: [] });
// const [editingExpense, setExpense]=useState(false)

//   const addExpense = (expense) => {
//     dispatch({ type: "ADD_EXPENSE", payload: { expense } });
//   };

//   const deleteExpense = (id) => {
//     dispatch({ type: "REMOVE_EXPENSE", payload: { id } });
//   };
//   const updateExpense=(expense,id)=>{
//     dispatch({ type: "EDIT_EXPENSE", payload: { expense,id } });
//   }
//   const changeExpenseToUpdate =(id)=>{
//     setExpense(true)
//     updateExpense(id)

//   }

//   return (
//     <>
//       <h2 className="mainHeading">Expense Tracker</h2>
//       <div className="App">
//         <ExpenseForm addExpense={addExpense}      editingExpense={editingExpense} updateExpense={updateExpense} />
//         <div className="expenseContainer">
//           <ExpenseInfo expenses={state.expenses} />
//           <ExpenseList
//             expenses={state.expenses}
//             deleteExpense={deleteExpense}
//             changeExpenseToUpdate={changeExpenseToUpdate}
//           />
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;
import React, { useState, useReducer } from "react";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import ExpenseInfo from "./components/ExpenseInfo/ExpenseInfo";
import ExpenseList from "./components/ExpenseList/ExpenseList";
import "./App.css";

const reducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case "ADD_EXPENSE": {
      return {
        expenses: [payload.expense, ...state.expenses]
      };
    }
    case "REMOVE_EXPENSE": {
      return {
        expenses: state.expenses.filter((expense) => expense.id !== payload.id)
      };
    }
    case "EDIT_EXPENSE": {
      const updatedExpenses = state.expenses.map((expense) => {
        if (expense.id === payload.id) {
          return payload.updatedExpenseData;
        }
        return expense;
      });

      return {
        expenses: updatedExpenses
      };
    }
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, { expenses: [] });
  const [editingExpense, setEditingExpense] = useState(null);

  const addExpense = (expense) => {
    dispatch({ type: "ADD_EXPENSE", payload: { expense } });
  };

  const deleteExpense = (id) => {
    dispatch({ type: "REMOVE_EXPENSE", payload: { id } });
  };

  const changeExpenseToUpdate = (id, updatedExpenseData) => {
    dispatch({
      type: "EDIT_EXPENSE",
      payload: { id, updatedExpenseData }
    });
    setEditingExpense(null);
  };

  const startEditingExpense = (id) => {
    const expenseToEdit = state.expenses.find((expense) => expense.id === id);
    if (expenseToEdit) {
      setEditingExpense(expenseToEdit);
    }
  };

  return (
    <>
      <h2 className="mainHeading">Expense Tracker</h2>
      <div className="App">
        <ExpenseForm
          addExpense={addExpense}
          editingExpense={editingExpense}
          changeExpenseToUpdate={changeExpenseToUpdate}
        />
        <div className="expenseContainer">
          <ExpenseInfo expenses={state.expenses} />
          <ExpenseList
            expenses={state.expenses}
            deleteExpense={deleteExpense}
            startEditingExpense={startEditingExpense}
          />
        </div>
      </div>
    </>
  );
}

export default App;







