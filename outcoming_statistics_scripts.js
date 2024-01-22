var caseId = msg['caseId'];

//var kb =  msg.senderReference.substr(0,msg.senderReference.indexOf("@"));
//var uuid = msg.senderReference.replace(kb+"@","");

var senderReference = JSON.parse(msg.senderReference);
var kbCode = msg['kbCode'];
var uuidCDS = senderReference.uuidCDS;

var approved = msg.approved;
var reviewer = msg.reviewer;
var DATETIMEVALID = DateUtil.getCurrentDate("YYYY-MM-dd HH:mm:ss");
var actions =  JSON.stringify(msg.actions);
var report =  msg.report.replace("Action\n","");
if (actions != "" || report !=""){
		var insert = "INSERT INTO statistics.response "
		insert +=" (caseId, uuidCDS, kbCode, approved, reviewer, DATETIMEVALID, actions, report) ";
		insert += " VALUES('"+caseId+"','"+uuidCDS+"','"+kbCode+"','"+approved+"','"+reviewer+"','"+DATETIMEVALID+"','"+actions+"','"+report+"')";
		var dbConn;
		var result;
						
		try {
		  dbConn = DatabaseConnectionFactory.createDatabaseConnection("com.mysql.jdbc.Driver", 'jdbc:mysql://localhost:3306/statistics', 'root', 'P@ssw0rdSynlab');
		  result = dbConn.executeUpdate(insert);
		} finally {
		  if (dbConn) {
			dbConn.close();
		  }
		}
	}
