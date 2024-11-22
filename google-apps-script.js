function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  
  try {
    Logger.log('Received POST request');
    Logger.log('Request data: ' + JSON.stringify(e));
    
    // Check if we have any data
    if (!e || (!e.parameter && !e.postData)) {
      throw new Error('No data received');
    }

    // Get the form data from the request
    var formData;
    if (e.postData) {
      // If data is sent as JSON
      formData = JSON.parse(e.postData.contents);
    } else {
      // If data is sent as form-data
      formData = e.parameter;
    }
    
    Logger.log('Form data received: ' + JSON.stringify(formData));
    
    const spreadsheetId = ''; // Your spreadsheet ID
    var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName('Registrations'); // Name the Sheet of the Google Sheet as 'Registrations'

    if (!sheet) {
      throw new Error('Sheet not found');
    }

    // Handle file upload if present
    var fileUrl = '';
    if (formData.collegeId) {
      var folderName = 'College ID Uploads';
      var folder = DriveApp.getFoldersByName(folderName).hasNext() ? 
        DriveApp.getFoldersByName(folderName).next() : 
        DriveApp.createFolder(folderName);
      
      var fileBlob;
      if (typeof formData.collegeId === 'string') {
        // If collegeId is a base64 string
        var base64Data = formData.collegeId.split(',')[1];
        fileBlob = Utilities.newBlob(Utilities.base64Decode(base64Data), 'application/octet-stream', 'college_id');
      } else {
        // If collegeId is a blob
        fileBlob = formData.collegeId;
      }
      
      var fileName = formData.name + '_CollegeID_' + new Date().toISOString();
      var file = folder.createFile(fileBlob);
      file.setName(fileName);
      fileUrl = file.getUrl();
    }

    var timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "MM/dd/yyyy HH:mm:ss");

    // Append data to sheet
    sheet.appendRow([
      timestamp,
      formData.name || '',
      formData.email || '',
      formData.phone || '',
      formData.graduationYear || '',
      formData.businessIdea || '',
      formData.funding || '',
      formData.progress || '',
      fileUrl
    ]);

    Logger.log('Data successfully appended to sheet');
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Data successfully recorded'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: 'Failed to record data: ' + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'success',
    message: 'GET request received'
  })).setMimeType(ContentService.MimeType.JSON);
}