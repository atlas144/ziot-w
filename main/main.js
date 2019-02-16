const getUser = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/api/v1/user/get', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            const res = JSON.parse(xhr.response);
            if (xhr.status == 200) {
                resolve(res);
            } else {
                reject(alert(res.message));
            }
        }
    }
    const id = window.localStorage.getItem('id');
    const token = window.localStorage.getItem('token');
    xhr.send(JSON.stringify({
        id: id,
        token: token,
    }));
});

const getStations = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/api/v1/station/get/many', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            const res = JSON.parse(xhr.response);
            if (xhr.status == 200) {
                resolve(res);
            } else {
                reject(alert(res.message));
            }
        }
    }
    const id = window.localStorage.getItem('id');
    const token = window.localStorage.getItem('token');
    xhr.send(JSON.stringify({
        id: id,
        token: token,
    }));
});

/*function showHide(divName) {
    const div = document.getElementById(divName);
    if (div.style.display === 'none') {
        div.style.display = 'block';
    } else {
        div.style.display = 'none';
    }
}*/

async function run() {
    const main = document.getElementById('main');
    const col1 = document.createElement('div');
    col1.id = 'column1';
    col1.className += 'column';
    const col2 = document.createElement('div');
    col2.id = 'column2';
    col2.className += 'column';
    main.appendChild(col1);
    main.appendChild(col2);

    const userDTO = await getUser;
    let stationsDTO = await getStations;
    //stationsDTO = [stationsDTO[0], stationsDTO[0], stationsDTO[0], stationsDTO[0], stationsDTO[0]]
    let maxColumns = 2;
    if (stationsDTO.length !== 1) {
        maxColumns = 3;
        const col3 = document.createElement('div');
        col3.id = 'column3';
        col3.className += 'column';
        main.appendChild(col3);
    }
    const userClass = new User();
    userClass.createUser(userDTO);
    let currentColumn = 2;
    let stationNumber = 1;
    for (station of stationsDTO) {
        if (currentColumn > maxColumns) {
            currentColumn = 1;
        }
        const stationClass = new Station();
        stationClass.createStation(station, stationNumber, `column${currentColumn}`);
        currentColumn++;
        stationNumber++;
    }
}

window.onload = run;