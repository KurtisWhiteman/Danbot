const fs = require('fs');

module.exports = {
    async checkLocal(command) {
        const response = await checkForCovidData(command);
        return response;
    }
  };

  async function checkForCovidData (command) {
    var file = fs.existsSync(`./files/` + command + `.json`);
    if (!file) {
        console.log("NO FILE FOUND RETURNING FALSE")
        return false;
    }
    console.log("FOUND A FILE")
    try {
        fs.readFile(`./files/` + command + `.json`, 'utf8' , (err, data) => {
            if (err) {
            console.error(err)
            return
            }
            console.log("ttt")
            console.log(data)
            return data
        })
    } catch (error) {
        console.error(error);
        // expected output: ReferenceError: nonExistentFunction is not defined
        // Note - error messages will vary depending on browser
    }
}