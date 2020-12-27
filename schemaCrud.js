const inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "Welcome1!",
  database: "employees_db",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  employeeTrackerStartQuestionsFunction();
});

function employeeTrackerStartQuestionsFunction() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do ?",
        name: "trackerStartQuestion",
        choices: [
          "View All Emloyee",
          "Add Epmloyee",
          "Remove Epployee",
          "Update Employee Role",
          "Update Emplpoyee Manager",
          "View All Roles",
          "Add Role",
          "Remove Role",
          "Exit",
        ],
      },
    ])
    .then((response) => {
      console.log(response);
      switch (response.trackerStartQuestion) {
        case "View All Emloyee":
          ViewAllEpmloyeeFunction();
          break;
        case "Add Epmloyee":
          AddEpmloyeeFunction();
          break;
        case "Remove Epployee":
          RemoveEpployeeFunction();
          break;
        case "Update Employee Role":
          UpdateEmployeeRoleFunction();
          break;
        case "Update Emplpoyee Manager":
          UpdateEmplpoyeeManagerFunction();
          break;
        case "View All Roles":
          ViewAllRolesFunction();
          break;
        case "Add or Update Role":
          AddOrUpdateRoleFunction();
          break;
        case "Remove Role":
          RemoveRoleFunction();
          break;
        case "Exit":
          connection.end();
          break;
      }
    });
}

function ViewAllEpmloyeeFunction() {
  connection.query(
    "SELECT id, first_name, last_name FROM employee",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      //employeeTrackerStartQuestionsFunction();
    }
  );
}

function ViewAllRolesFunction() {
  connection.query(
    "SELECT * FROM employee INNER JOIN roles ON employee.role_id = roles.id",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      //employeeTrackerStartQuestionsFunction();
    }
  );
}

function AddEpmloyeeFunction() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the New Employee`s ID Number?",
        name: "NewEmployeeIdInput",
      },
      {
        type: "input",
        message: "What is the New Employee`s First Name?",
        name: "NewEmployeeFirstName",
      },
      {
        type: "input",
        message: "What is the New Employee`s Last Name?",
        name: "NewEmployeeLastName",
      },
      {
        type: "list",
        message: "What is the New Employee`s Role Id?",
        name: "NewEmployeeRoleId",
        choices: ["88", "14", "5", "10"],
      },
      {
        type: "list",
        message: "What is the Manager Id`s of the New Employee?",
        name: "NewEmployeeManagerId",
        choices: ["1", "14"],
      },
    ])
    .then(function (Data) {
      console.log(Data);
      connection.query(
        "INSERT INTO employee SET ?",
        {
          id: Data.NewEmployeeIdInput,
          first_name: Data.NewEmployeeFirstName,
          last_name: Data.NewEmployeeLastName,
          role_id: Data.NewEmployeeRoleId,
          manager_id: Data.NewEmployeeManagerId,
        },
        function (error) {
          if (error) throw error;
          console.log("Added New Employee To Database");
          employeeTrackerStartQuestionsFunction();
        }
      );
    });
}

function RemoveEpployeeFunction() {
  connection.query("SELECT * FROM employee;", function (err, res) {
    console.log(res);
    inquirer.prompt([
      {
        type: "list",
        message: "What Employee would you like to Remove ?",
        name: "removeEmployee",
        choices: res.map((obj) => ({name: `${obj.last_name}, ${obj.first_name}`, value: `${obj.id}` }))
      },
    ])
    .then(function (Data) {
      console.log(Data);
      connection.query(
        "DELETE FROM employee WHERE id = ?",
        Data.removeEmployee,          
        function (error) {
          if (error) throw error;
          console.log("Removed Employee From Database");
          employeeTrackerStartQuestionsFunction();
        }
      );
    });
  });
}

function UpdateEmployeeRoleFunction() {
  connection.query("SELECT * FROM employee;", function (err, res) {
    console.log(res);
    inquirer.prompt([
      {
        type: "list",
        message: "What Employee`s Role Would you like to Update?",
        name: "UpdateEmployeeRole",
        choices: res.map((obj) => ({name: `${obj.last_name}, ${obj.first_name}`, value: `${obj.id}` }))
      },

      {
        type: "list",
        message: "What is The New Role Id?",
        name: "UpdatedRoleID",
        choices: [88, 24, 14, 10, 5,]
      },
    ])
    .then(function (Data) {
      console.log(Data);
      connection.query(
        "UPDATE employee SET role_id = ? WHERE id = ?",
        [
          Data.UpdatedRoleID,
          Data.UpdateEmployeeRole,

        ],
        function (error) {
          if (error) throw error;
          console.log("Employee`s Role Has Been Updated");
          employeeTrackerStartQuestionsFunction();
        }
      );
    });
  });
}

function UpdateEmplpoyeeManagerFunction() {
  connection.query("SELECT * FROM employee;", function (err, res) {
    console.log(res);
    inquirer.prompt([
      {
        type: "list",
        message: "What Employee Manager Would you like to Update ?",
        name: "UpdateEmployeeManager",
        choices: res.map((obj) => ({name: `${obj.last_name}, ${obj.first_name}`, value: `${obj.id}` }))
      },
      {
        type: "list",
        message: "What is The New Updated Manager`s Id?",
        name: "NewRoleID",
        choices: [88, 14, "Null", ]
      },
    ])
    .then(function (Data) {
      console.log(Data);
      connection.query(
        "UPDATE employee SET manager_id = ? WHERE id = ?",
        [
          Data.UpdateEmployeeManager,
          Data.NewRoleID,
        ],
        function (error) {
          if (error) throw error;
          console.log("Updated Employee`s Manager`s Id");
          employeeTrackerStartQuestionsFunction();
        }
      );
    });
  });
}

function ViewAllEpmloyeeFunction() {
  connection.query(
    "SELECT id, first_name, last_name FROM employee",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      employeeTrackerStartQuestionsFunction();
    }
  );
}

function RemoveRoleFunction() {
  connection.query("SELECT * FROM employee;", function (err, res) {
    console.log(res);
    inquirer.prompt([
      {
        type: "list",
        message: "What Employee`s Role would you like to Remove ?",
        name: "removeEmployeeRole",
        choices: res.map((obj) => ({name: `${obj.last_name}, ${obj.first_name}`, value: `${obj.id}` }))
      },
    ])
    .then(function (Data) {
      console.log(Data);
      connection.query(
        "DELETE FROM employee.role_id WHERE id = ?",
        Data.removeEmployeeRole,          
        function (error) {
          if (error) throw error;
          console.log("Removed Employee From Database");
          employeeTrackerStartQuestionsFunction();
        }
      );
    });
  });
}


function AddOrUpdateRoleFunction() {
  connection.query("SELECT * FROM employee;", function (err, res) {
    console.log(res);
    inquirer.prompt([
      {
        type: "list",
        message: "What Employee`s Role Would you like to Update ?",
        name: "EmployeeRoleIdBeingUpdated",
        choices: res.map((obj) => ({name: `${obj.last_name}, ${obj.first_name}`, value: `${obj.id}` }))
      },
      {
        type: "list",
        message: "What is The New Role ?",
        name: "NewUpdatedRoleID",
        choices: [5, 7, 10, 14, 24, 88, ]
      },
    ])
    .then(function (Data) {
      console.log(Data);
      connection.query(
        "UPDATE employee SET role_id = ? WHERE id = ?",
        [
          Data.EmployeeRoleIdBeingUpdated,
          Data.NewUpdatedRoleID,
        ],
        function (error) {
          if (error) throw error;
          console.log("Updated Employee`s Manager`s Id");
          employeeTrackerStartQuestionsFunction();
        }
      );
    });
  });
}