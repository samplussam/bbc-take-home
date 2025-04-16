TEST CASES:

Scenario: Successful request for a list of images  
 Given I have valid credentials to access the API  
 When I make a GET request to "https://web-cdn.api.bbci.co.uk/wc-uploader/sport/live-events/my-photos"  
 Then I should receive a response with status code 200  
 And the response should contain a list of images

Scenario: Successful upload of a .jpg/.png file  
 Given I am authorised to upload to the API  
 When I make a post request to "https://web-cdn.api.bbci.co.uk/wc-uploader/sport/live-events/my-photos(?upload=<filename.jpg|png>)"  
 Then I should receive a response with status code 200  
 And the the file should be uploaded.

Scenario: Unsuccessful upload using a duplicate filename  
 Given I am authorised to upload to the API  
 When I make a post request to "https://web-cdn.api.bbci.co.uk/wc-uploader/sport/live-events/my-photos(?upload=<filename.jpg|png>)"  
 And I use an existing filename  
 Then I should receive a response with status code 400  
 And the response should contain an error message "Duplicate Filename"

Scenario: Unsuccessful upload using an incorrect file type  
 Given I am authorised to upload to the API  
 And I have a file named "event-photo.gif"  
 When I make a GET request to "https://web-cdn.api.bbci.co.uk/wc-uploader/sport/live-events/my-photos?upload=event-photo.gif"  
 Then I should receive a response with status code 415  
 And the response should contain an error message "Unsupported file type"

Scenario: Unsuccessful upload when file is too big  
 Given I am authorised to upload to the API  
 And I have a file named "large-photo.jpg" that exceeds the file size limit  
 When I make a POST request to "https://web-cdn.api.bbci.co.uk/wc-uploader/sport/live-events/my-photos?upload=large-photo.jpg"  
 Then I should receive a response with status code 413  
 And the response should contain an error message "File size too big"

VALIDATING EACH TEST CASE:

Pre-Conditions for validating each test case

Authentication:

- Ensure you have valid credentials to access the API.
- If an access token is required, ensure it is included in the request header under Authorization: Bearer <token>

Tooling:

- You can use a tool such as Postman or Insomnia to test the API requests.
- Ensure you have set the correct HTTP method for each scenario, and are using the appropriate endpoint

Scenario 1:  
 Create a new GET request.  
 Include the authorisation token in the request header as Authorization: Bearer <token>.  
 Set the request URL as https://web-cdn.api.bbci.co.uk/wc-uploader/sport/live-events/my-photos.  
 Click Send to execute the request.  
 Verify that the response contains: Status code 200.

Scenario 2:  
 Create a new POST request.  
 In the request body, select form-data for uploading files.  
 Choose the file to upload.  
 Set the request URL as https://web-cdn.api.bbci.co.uk/wc-uploader/sport/live-events/my-photos?upload=<filename.jpg>.  
 Click Send to execute the request.  
 Verify that the response contains: Status code 200.

Scenario 3:  
 Create a new POST request.  
 In the request body, select form-data and upload the image using an existing filename.  
 Set the request URL as https://web-cdn.api.bbci.co.uk/wc-uploader/sport/live-events/my-photos?upload=<existing_filename.jpg>.  
 Click Send to execute the request.  
 Verify that the response contains: Status code 400.  
 Response should include the error "Duplicate Filename".

Scenario 4:  
 Create a new POST request.  
 In the request body, select form-data and upload a file with an unsupported extension.  
 Set the request URL as https://web-cdn.api.bbci.co.uk/wc-uploader/sport/live-events/my-photos?upload=event-photo.gif.  
 Click Send to execute the request.  
 Verify that the response contains: Status code 415.  
 Response should include the error "Unsupported file type".

Scenario 5:  
 Create a new POST request.  
 In the request body, select form-data and upload a file that exceeds the file size limit.  
 Set the request URL as https://web-cdn.api.bbci.co.uk/wc-uploader/sport/live-events/my-photos?upload=large-photo.jpg.  
 Click Send to execute the request.  
 Verify that the response contains: Status code 413.  
 Response should include the error "File size too big".
