import React, { Component } from 'react';

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { employees: [], loading: true };
  }

  componentDidMount() {
    this.populateEmployeeData();
  }

  static renderEmployeesTable(employees) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee =>
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderEmployeesTable(this.state.employees);

    return (
      <div>
        <h1 id="tabelLabel" >Employees</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }

  async populateEmployeeData() {
    const response = await fetch('api/employees');
    const data = await response.json();
    this.setState({ employees: data, loading: false });
  }
}
