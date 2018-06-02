# COMP249 Assignment 3
# Bradley Kenny [SID: 45209723]

### Main Features
- When opening the page, users are presented with the ten most recent job postings.
- Clicking on a card brings up more information on the right side of the page. 
- Clicking the cross on any 'information card' on the right closes the panel.
- The 'Apply' form is initially hidden but clicking on any 'Apply' button will display the form so that users can apply for the job they have clicked on.
- Applying for a job routes to '/apply' and the user application is stored in a JSON file.
- Users can use the search box in the navigation bar to search for jobs. Any spaces in the search box act as an 'or' operator. Therefore, the search term "software technical" will search for any job titles with the words "software" OR "technical".

### Extra Features
- search appears as you type.
- when searching, clicking on a card makes it appear next to the search. when exiting 'search mode', the card moves back to the top with the rest of the content.
- apply card ID and job title auto fill depending on what card you click
