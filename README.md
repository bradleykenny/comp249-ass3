### Bradley Kenny [SID: 45209723]
# COMP249 Assignment 3

### Main Features
- When opening the page, users are presented with the ten most recent job postings.
- Clicking on a card brings up more information on the right side of the page. 
- Clicking the cross on any 'information card' on the right closes the panel.
- The 'Apply' form is initially hidden but clicking on any 'Apply' button will display the form so that users can apply for the job they have clicked on.
- Applying for a job routes to '/apply' and the user application is stored in a JSON file. Instead of going to '/apply', the information from the page is instead displayed inside the 'Apply' form card.
- Users can use the search box in the navigation bar to search for jobs. Any spaces in the search box act as an 'or' operator. Therefore, the search term "software technical" will search for any job titles with the words "software" OR "technical".

### Extra Features
- Search results appear as you type. When there are search terms in the box, the search results begin appearing on the page and hide the '10 latest' results that were showing before. To help when dealing with searches with lots of results, clicking the cards makes the 'information card' appear next to where to clicked so that users don't have to scroll up all the time. Removing all terms from the box reverts back to the default 10 results and the 'information card' is placed back up the top.
- When applying for a job, clicking the apply button automatically prefills some information in the form. This will help users so that they don't have to go searching for the ID, or mistyping it. This apply form will hide when clicking on other jobs so that users don't get confused and start trying to apply for the wrong job.

### Notes
- The links at the top of the page are placeholders only.
- Had a 'recognition' text box at the bottom but removed because clicking on cards below the existing page space moves the 'information card' outside the container so the text box was misplaced.
