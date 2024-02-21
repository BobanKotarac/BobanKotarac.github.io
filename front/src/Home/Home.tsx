import React, { useState, useEffect } from 'react';

function Home() {
  const [selectedDatabaseName, setSelectedDatabaseName] = useState('companies');
  const [companies, setCompanies] = useState<company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  interface company {
    company_id: number
    company_name:string,
    company_db:string
  }

  useEffect(() => {
    handleSwitchDatabase()
    // Fetch company names from backend
    fetch('http://localhost:2000/getCompanies', {
      method: 'GET',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch companies');
        }
        return response.json();
      })
      .then(data => {
        setCompanies(data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  const handleCompanyChange = (event) => {
    const selectedCompany = event.company_name;
    const selectedCompanyDb = companies.find(company => company.company_name === selectedCompany)?.company_db;
    //@ts-ignore
    setSelectedDatabaseName(selectedCompanyDb);
  };

  const handleSwitchDatabase = () => {
    // Send request to switch database
    fetch('http://localhost:2000/switchDatabase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        databaseName: selectedDatabaseName,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to switch database');
        }
        console.log('Database switched successfully', selectedDatabaseName + "jedi govna");
        // Handle success
      })
      .catch(error => {
        console.error('Error switching database:', error.message);
        // Handle error
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <select onChange={handleCompanyChange}>
        <option value="">Select a company</option>
        {companies.map(company => (
          <option key={company.company_id}>{company.company_name}</option>
        ))}
      </select>
      <button onClick={handleSwitchDatabase}>Switch Database</button>
    </div>
  );
}

export default Home;
