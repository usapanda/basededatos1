import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MDBContainer, MDBCol, MDBRow, MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  let navigate = useNavigate();
  const [fileContent, setFileContent] = useState(null);
  const API_URL = 'http://localhost:3000/employees'
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const content = e.target.result;

        try {
          const dataArray = JSON.parse(content);
          setFileContent(dataArray);
          console.log(dataArray)
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      };

      reader.readAsText(file);
    }
  };

  function leerdatos() {
    if (fileContent && fileContent.length > 0) {
      fileContent.forEach(async (emp) => {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(emp),
        });
        if (response.ok) {
          console.log("Register employee succesfully")
        }
      });
    }
  }
  return (
    <div>
      <MDBContainer>
        <MDBRow>
          <MDBCol></MDBCol>
          <MDBCol>
            <MDBRow>
              <MDBBtn className='mb-5'>Importar DAT</MDBBtn>

            </MDBRow>
            <MDBRow>
              <input type="file" onChange={handleFileChange} />

              {fileContent && fileContent.length > 0 && <div>{fileContent.length} Results Loaded</div>}
              <MDBBtn className='mb-5' onClick={leerdatos}>
                Importar JSON</MDBBtn>

            </MDBRow>

            <MDBBtn className='mb-5'>Importar Excl</MDBBtn>

          </MDBCol>
          <MDBCol></MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol>

            <MDBBtn className='me-5'>Ver datos DAT</MDBBtn>
            <MDBBtn className='me-5'>Ver datos JSON</MDBBtn>
            <MDBBtn className='me-5'>Ver datos Excl</MDBBtn>
            <MDBBtn className='me-5' onClick={() => navigate('/')}>Go back</MDBBtn>

          </MDBCol>
        </MDBRow>

      </MDBContainer>

    </div>
  )
}