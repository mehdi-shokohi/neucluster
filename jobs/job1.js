
function situationScan(arg) {
  console.log(`Im In Worker ${process.pid} In JOB1 Side` )

}





exports.JobRunning=()=>{
  setInterval(situationScan, 6000); //One Minutes
}