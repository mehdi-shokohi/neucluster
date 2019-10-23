
function situationScan(arg) {
  console.log(`Im In Worker ${process.pid} In JOB2 Side` )
  var service = new serv_one();
  service.job_run();
}





exports.JobRunning=()=>{
  setInterval(situationScan, 8000); //One Minutes
}

