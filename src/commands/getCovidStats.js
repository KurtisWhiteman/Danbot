const axios = require("axios");
const { codeBlock } = require("discord.js");
const fs = require('fs');


module.exports = {
  name: 'getCovidStats',
  description: 'command to get covid stats',
  async execute(message, command) {
      console.log(command);
      getCovidJSON(command, message);
  }
}

async function getCovidJSON (command, message) {
  discordMessage = getCovidDataFile(function(result) {
    console.log("discordMESSAGE");

    discordMessage = generateCovidMessage(result);

    message.channel.send(discordMessage);
  });

}

// public endpoint to get covid stats
async function getJSON () {
    console.log("in getJSON")
      // Note the await keyword
      const data = await axios.get("https://covidlive.com.au/covid-live.json")
      .then(response => {
        console.log('a successful response');
        return response.data;
      })
      return data;
}

function getDateString (covidStats) {
  const DATE = covidStats.REPORT_DATE;

  return ":calendar_spiral: " + DATE + "\n";
}

function getStateString (covidStats) {
  const STATE = covidStats.NAME

  return ":flag_au: " + STATE  + "\n";
}

function getCaseString (covidStats) {
  const NEW_CASE_CNT = Number(covidStats.NEW_CASE_CNT).toLocaleString();
  const ACTIVE_CNT = Number(covidStats.ACTIVE_CNT).toLocaleString();

  return ":microbe: +" + NEW_CASE_CNT + " Cases | " + ACTIVE_CNT + " active cases"  + "\n";
}

function getDeathString (covidStats) {
  const DEATH_CNT = Number(covidStats.DEATH_CNT).toLocaleString();
  const NEW_DEATH_CNT = Number(covidStats.DEATH_CNT - covidStats.PREV_DEATH_CNT).toLocaleString();

  return ":coffin: +" + NEW_DEATH_CNT + " Deaths | " + DEATH_CNT + " total deaths"  + "\n";
}

function getTestString (covidStats) {
  const TEST_CNT = Number(covidStats.TEST_CNT).toLocaleString();
  const NEW_TEST_CNT = Number(covidStats.TEST_CNT - covidStats.PREV_TEST_CNT).toLocaleString();

  return ":test_tube: +" + NEW_TEST_CNT + " Tests | " + TEST_CNT + " total tests"  + "\n";
}

function getVaccinationString (covidStats) {
  const VACC_PEOPLE_CNT = Number(covidStats.VACC_PEOPLE_CNT).toLocaleString();
  const NEW_VACC_CNT = Number(covidStats.VACC_PEOPLE_CNT - covidStats.PREV_VACC_PEOPLE_CNT).toLocaleString();

  if (VACC_PEOPLE_CNT) {
    return ":syringe: +" + NEW_VACC_CNT + " Vaccinations | " + VACC_PEOPLE_CNT + " total vaccination shots" + "\n";
  }
  return ":syringe: Vaccination stats not yet available\n";
}

// Get stats based on state in command entered
function stateSwitch(data) {
  switch (command) {
    case 'daily-cases':
    covidStats = data[0];
    break;
    case 'daily-cases-nsw':
    covidStats = data[1];
    break;
    case 'daily-cases-vic':
    covidStats = data[2];
    break;
    case 'daily-cases-qld':
    covidStats = data[3];
    break;
    case 'daily-cases-wa':
    covidStats = data[4];
    break;
    case 'daily-cases-sa':
    covidStats = data[5];
    break;
    case 'daily-cases-tas':
    covidStats = data[6];
    break;
    case 'daily-cases-act':
    covidStats = data[7];
    break;
    case 'daily-cases-nt':
    covidStats = data[8];
    break;
}  
}

function generateCovidMessage(covidStats) {
  if (covidStats.NEW_CASE_CNT !== null && covidStats.NEW_CASE_CNT != 0) {
    console.log(covidSTATS.ACTIVE_CNT)
    discordMessage = "";
    console.log(discordMessage);
    discordMessage += getDateString(covidStats);
    console.log(discordMessage);
    discordMessage += getStateString(covidStats);
    discordMessage += getCaseString(covidStats);
    discordMessage += getDeathString(covidStats);
    discordMessage += getTestString(covidStats);
    discordMessage += getVaccinationString(covidStats);
    console.log(discordMessage);

    return discordMessage;
  } else if (!covidStats.NEW_CASE_CNT && !covidStats.PREV_NEW_CASE_CNT) {
    return "Covid zero baby!";
  } else { 
    return "Yeah nah wait for the conference before asking mate, cheers.";
  }
}

function getCovidDataFile (command) {
  if (!fs.existsSync('./src/files/' + command + '.json')) {
      console.log("NO FILE FOUND RETURNING FALSE");
      newFileData = getJSON();
      fs.writeFile("./src/files/" + command + ".json", JSON.stringify(newFileData), function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Saved data")
        }
      });
      return newFileData;
  } else {
    try {
        currentFileData = fs.readFile(`./src/files/` + command + `.json`, 'utf8' , (err, data) => {
            if (err) {
            console.error(err)
            return
            }
            console.log("file read")
            return data;
        })
        return currentFileData;
    } catch (error) {
        console.error(error);
        // expected output: ReferenceError: nonExistentFunction is not defined
        // Note - error messages will vary depending on browser
    }
  }
}