// import React, { useEffect, useRef } from "react";
// import styles from "./ExpenseForm.module.css";

// const ExpenseForm = ({ addExpense, editingExpense ,updateExpense  }) => {
//   const expenseTextInput = useRef();
//   const expenseAmountInput = useRef();
//   const [isEditing, setIsEditing] = useState(false);


//   // Use the useEffect hook here, to check if an expense is to be updated
//   // If yes, the autofill the form values with the text and amount of the expense
//   useEffect(() => {
//     if (editingExpense) {
//       setIsEditing(true);
//     } else {
//       setIsEditing(false);
//       clearInput();
//     }
//   }, [editingExpense]);

//   const onSubmitHandler = (e) => {
//     e.preventDefault();
//     const expenseText = expenseTextInput.current.value;
//     const expenseAmount = expenseAmountInput.current.value;
//     if (parseInt(expenseAmount) === 0) {
//       return;
//     }

//     const expense = {
//       text: expenseText,
//       amount: expenseAmount,
//       id: new Date().getTime()
//     };
//     if(isEditing){
//       updateExpense(expense,expense.id)
//     }else{
//     addExpense(expense);
//     }
//     clearInput();
//     return;

//     // Logic to update expense here
//   };

//   const clearInput = () => {
//     expenseAmountInput.current.value = "";
//     expenseTextInput.current.value = "";
//   };

//   return (
//     <form className={styles.form} onSubmit={onSubmitHandler}>
//       {/* Change text to Edit Transaction if an expense is to be updated */}
//       <h3>Add new transaction</h3>
//       <label htmlFor="expenseText">Text</label>
//       <input
//         id="expenseText"
//         className={styles.input}
//         type="text"
//         placeholder="Enter text..."
//         ref={expenseTextInput}
//         required
//       />
//       <div>
//         <label htmlFor="expenseAmount">Amount</label>
//         <div>(negative - expense,positive-income)</div>
//       </div>
//       <input
//         className={styles.input}
//         id="expenseAmount"
//         type="number"
//         placeholder="Enter amount..."
//         ref={expenseAmountInput}
//         required
//       />
//       <button className={styles.submitBtn}>
//         {/* Change text to Edit Transaction if an expense is to be updated */}
//         Add Transaction
//       </button>
//     </form>
//   );
// };

// export default ExpenseForm;
import React, { useEffect, useRef, useState } from "react";
import styles from "./ExpenseForm.module.css";

const ExpenseForm = ({ addExpense, editingExpense, changeExpenseToUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const expenseTextInput = useRef();
  const expenseAmountInput = useRef();

  useEffect(() => {
    if (editingExpense) {
      setIsEditing(true);
      expenseTextInput.current.value = editingExpense.text;
      expenseAmountInput.current.value = editingExpense.amount;
    } else {
      setIsEditing(false);
      clearInput();
    }
  }, [editingExpense]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const expenseText = expenseTextInput.current.value;
    const expenseAmount = expenseAmountInput.current.value;
    
    if (parseInt(expenseAmount) === 0) {
      return;
    }

    const expense = {
      text: expenseText,
      amount: expenseAmount,
      id: isEditing ? editingExpense.id : new Date().getTime(),
    };

    if (isEditing) {
      changeExpenseToUpdate(expense.id, expense);
    } else {
      addExpense(expense);
    }
    
    clearInput();
  };

  const clearInput = () => {
    expenseAmountInput.current.value = "";
    expenseTextInput.current.value = "";
  };

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <h3>{isEditing ? "Edit Transaction" : "Add new transaction"}</h3>
      <label htmlFor="expenseText">Text</label>
      <input
        id="expenseText"
        className={styles.input}
        type="text"
        placeholder="Enter text..."
        ref={expenseTextInput}
        required
      />
      <div>
        <label htmlFor="expenseAmount">Amount</label>
        <div>(negative - expense, positive - income)</div>
      </div>
      <input
        className={styles.input}
        id="expenseAmount"
        type="number"
        placeholder="Enter amount..."
        ref={expenseAmountInput}
        required
      />
      <button className={styles.submitBtn}>
        {isEditing ? "Update Transaction" : "Add Transaction"}
      </button>
    </form>
  );
};

export default ExpenseForm;
