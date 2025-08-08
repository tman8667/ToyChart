import { useState } from 'react'
import './App.css'

function App() {

  return (
      <div className={"App"}>
          <header className={"App-header"}>
              <h1>ToyChart</h1>
              <div className="DataSections">
                  <div className="AddFormula">
                      <h2> Chart Formulas </h2>
                      <p>Enter a name for your chart (cannot be an existing name) and the multipliers for the
                          different components (must be decimal values that sum to 1). If you do not know what to use
                          for the stream tiers, use a 48/45/7% split of total streaming weight for
                          free/paid/programmed.</p>
                      <input type="chart name" className="form-control" id="chartNameFormulaInput"
                             placeholder="Chart Name">
                      </input>
                      <input type="free streams multiplier" className="form-control" id="freeMultInput"
                             placeholder="Free streams multiplier">
                      </input>
                      <input type="paid streams multiplier" className="form-control" id="paidMultInput"
                             placeholder="Paid streams multiplier">
                      </input>
                      <input type="programmed streams multiplier" className="form-control" id="programmedMultInput"
                             placeholder="Programmed streams multiplier">
                      </input>
                      <input type="sales multiplier" className="form-control" id="salesMultInput"
                             placeholder="Sales multiplier">
                      </input>
                      <input type="radio multiplier" className="form-control" id="radioMultInput"
                             placeholder="Radio multiplier">
                      </input>
                      <SubmitFormulaButton/>
                      <br></br>
                      <br></br>
                      <RetrieveFormulasButton/>
                      <table id="formulasTable">
                          <tbody id="formulasTableHeader">
                          <tr>
                              <th>Chart Name</th>
                              <th>Free Streams</th>
                              <th>Paid Streams</th>
                              <th>Programmed Streams</th>
                              <th>Sales</th>
                              <th>Radio</th>
                          </tr>
                          </tbody>
                          <tbody id="formulasTableBody">
                          </tbody>
                      </table>
                  </div>
                  <div className="AddEntry">
                      <h2> Add Chart Entry </h2>
                      <p>Enter a name for the chart to add to (must have a chart formula with that name added) and
                          enter the details. Chart date string can be any format but must be consistent to retrieve
                          entries for the same date.</p>
                      <input type="chart name" className="form-control" id="chartNameEntryInput"
                             placeholder="Chart Name">
                      </input>
                      <input type="chart date" className="form-control" id="chartDateInput"
                             placeholder="Chart date">
                      </input>
                      <input type="song" className="form-control" id="songInput"
                             placeholder="Song title">
                      </input>
                      <input type="artist" className="form-control" id="artistInput"
                             placeholder="Artist name">
                      </input>
                      <input type="free streams" className="form-control" id="freeStreamsInput"
                             placeholder="Free streams">
                      </input>
                      <input type="paid streams" className="form-control" id="paidStreamsInput"
                             placeholder="Paid streams">
                      </input>
                      <input type="programmed streams" className="form-control" id="programmedStreamsInput"
                             placeholder="Programmed streams">
                      </input>
                      <input type="sales" className="form-control" id="salesInput"
                             placeholder="Sales">
                      </input>
                      <input type="radio audience" className="form-control" id="radioInput"
                             placeholder="Radio audience">
                      </input>
                      <input type="image url" className="form-control" id="imgURLInput"
                             placeholder="Image URL">
                      </input>
                      <SubmitAddEntryButton/>
                      <br></br>
                      <br></br>
                  </div>
                  <div className="AddEntry">
                      <h2> View Chart Entries </h2>
                      <p>Enter a name for the chart to retrieve entries from, then select a date from the dropdown.</p>
                      <input type="chart name" className="form-control" id="getChartNameInput"
                             placeholder="Chart Name">
                      </input>
                      <SelectChartDate/>
                      <br></br>
                      <br></br>
                      <table id="entriesTable">
                          <tbody id="entriesTableHeader">
                          <tr>
                              <th>Image</th>
                              <th>Song</th>
                              <th>Artist</th>
                              <th>Free Streams</th>
                              <th>Paid Streams</th>
                              <th>Programmed Streams</th>
                              <th>Sales</th>
                              <th>Radio</th>
                              <th>Points</th>
                          </tr>
                          </tbody>
                          <tbody id="entriesTableBody">
                          </tbody>
                      </table>
                      <br></br>
                  </div>
              </div>
          </header>
      </div>
  );
}

function SubmitFormulaButton() {
    return (
        <button onClick={handleFormula} id="submitFormula">
            Submit
        </button>
    );
}

function RetrieveFormulasButton() {
    return (
        <button onClick={handleRetrieveFormula} id="retrieveFormula">
            Refresh Formulas
        </button>
    );
}

function SubmitAddEntryButton() {
    return (
        <button onClick={handleAddEntry} id="submitAddEntry">
            Submit
        </button>
    );
}

function SelectChartDate() {
    return (
        <select onClick={getDates} name={"ChartDates"} id="selectChartDates"></select>
    )
}

async function handleFormula() {
    const chartName = document.getElementById("chartNameFormulaInput").value;
    const freeMult = document.getElementById("freeMultInput").value;
    const paidMult = document.getElementById("paidMultInput").value;
    const programmedMult = document.getElementById("programmedMultInput").value;
    const salesMult = document.getElementById("salesMultInput").value;
    const radioMult = document.getElementById("radioMultInput").value;

    const reqBody = {
        "chartName": chartName,
        "freeStreamsMultiplier": freeMult,
        "paidStreamsMultiplier": paidMult,
        "programmedStreamsMultiplier": programmedMult,
        "salesMultiplier": salesMult,
        "radioAudienceMultiplier": radioMult
    }

    const response = await fetch("http://localhost:8080/api/chartFormula/", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reqBody)
    });

    const body = await response.json();

    if (response.status === 500 || response.status === 403) {
        alert(body.message);
    }
    else if (response.status === 200) {
        alert("Chart formula added successfully.");
    }
}

async function handleRetrieveFormula() {
    const response = await fetch("http://localhost:8080/api/chartFormula/", {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const body = await response.json();

    if (response.status === 500) {
        alert(body.message);
    }
    else if (response.status === 200) {
        const tableBody = document.getElementById("formulasTableBody");

        if (tableBody) {
            tableBody.innerHTML = "";
        }

        body.forEach((formula) => {
            const row = tableBody.insertRow();
            let cell = row.insertCell();
            cell.textContent = formula.chartName;
            cell = row.insertCell();
            cell.textContent = formula.freeStreamsMultiplier;
            cell = row.insertCell();
            cell.textContent = formula.paidStreamsMultiplier;
            cell = row.insertCell();
            cell.textContent = formula.programmedStreamsMultiplier;
            cell = row.insertCell();
            cell.textContent = formula.salesMultiplier;
            cell = row.insertCell();
            cell.textContent = formula.radioAudienceMultiplier;
        });
    }
}

async function handleAddEntry() {
    const chartName = document.getElementById("chartNameEntryInput").value;
    const chartDate = document.getElementById("chartDateInput").value;
    const song = document.getElementById("songInput").value;
    const artist = document.getElementById("aristInput").value;
    const freeStreams = document.getElementById("freeStreamsInput").value;
    const paidStreams = document.getElementById("paidStreamsInput").value;
    const programmedStreams = document.getElementById("programmedStreamsInput").value;
    const sales = document.getElementById("salesInput").value;
    const radio = document.getElementById("radioInput").value;
    const imgURL = document.getElementById("imgURLInput").value;

    const response = await fetch(
        "http://localhost:8080/api/chartFormula/getDates?chartName=" + encodeURI(chartName), {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            }
    });

    const body = await response.json();


    let points = 0;
    if (response.status === 500 || response.status === 404) {
        alert(body.message);
        return;
    }
    else if (response.status === 200) {
        points = (freeStreams * body.freeStreamsMultiplier) +
            (paidStreams * body.paidStreamsMultiplier) +
            (programmedStreams * body.programmedStreamsMultiplier) +
            (sales * body.salesMultiplier) +
            (radio * body.radioAudienceMultiplier);
    }

    const reqBody = {
        "chartName": chartName,
        "chartDate": chartDate,
        "song": song,
        "artist": artist,
        "freeStreams": freeStreams,
        "paidStreams": paidStreams,
        "programmedStreams": programmedStreams,
        "sales": sales,
        "radioAudience": radio,
        "points": points,
        "imgURL": imgURL
    }

    const response2 = await fetch(
        "http://localhost:8080/api/chartEntry/" + encodeURI(chartName), {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reqBody)
        });

    const body2 = await response2.json();

    if (response2.status === 500 || response.status === 403) {
        alert(body2.message);
    }
    else if (response2.status === 200) {
        alert("Chart entry added successfully.");
    }
}

async function getDates() {
    const chartName = document.getElementById("getChartNameInput").value;
    const dropdownBody = document.getElementById("selectChartDates");

    const response = await fetch(
        "http://localhost:8080/api/chartEntry/?chartName=" + encodeURI(chartName), {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const body = await response.json();

    if (response.status === 500 || response.status === 404) {
        alert(body.message);
    }
    else if (response.status === 200) {
        if (dropdownBody) {
            dropdownBody.innerHTML = "";
        }

        body.forEach((date) => {
            // Add dates to dropdown
        });
    }
}

export default App
