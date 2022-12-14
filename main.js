


    document.getElementById('issueInputForm').addEventListener('submit', saveIssue)
        
    
    
    function fetchIssues(){

        let issues = JSON.parse(localStorage.getItem('issues'))
        let issuesList = document.getElementById('issuesList')
        console.log(issues)

        issuesList.innerHTML= "";

        for (let i = 0; i < issues.length; i++){
            let id = issues[i].id
            let subject = issues[i].subject
            let description = issues[i].description
            let severity = issues[i].severity
            let assignedTo = issues[i].assignedTo
            let status = issues[i].status
            let statusColor = status == "Closed" ? "bg-info" : "bg-danger"

            issuesList.innerHTML += 
            '<div class="well">' +
        '<h6>Issue ID:' + id + '</h6>' +
        '<p><span class= "bg ' + statusColor + ' ">' + status + '</span></p>' +
        '<h3>' + subject + '</h3>' +
        '<article>' + description + '</article>' + 
        '<p><ion-icon name="radio-outline"></ion-icon></span> ' + severity + ' ' + '<ion-icon name="person-circle-outline"></ion-icon>' + assignedTo + '</p>' +
        '<a href="#" class="btn btn-warning" onclick="setStatusClosed(\''+id+'\')">Close</a> ' +
        '<a href="#" class="btn btn-danger" onclick="deleteIssue(\''+id+'\')">Delete</a> '
        + '</div><br><hr>'            
        }

    }

    function saveIssue(e) {
        let IssueId = chance.guid()
        let issueSubject = document.getElementById('issueSubjInput').value
        let issueDescription = document.getElementById('issueDescInput').value
        let issueSeverity = document.getElementById('issueSeverityInput').value
        let issueAssignedTo = document.getElementById('issueAssignedTo').value
        let issueStatus = "Open"

        let issue = {
            id: IssueId,
            subject: issueSubject,
            description: issueDescription,
            severity: issueSeverity,
            assignedTo: issueAssignedTo,
            status: issueStatus

        }

        if (localStorage.getItem('issues') === null){
            let issues = []
            issues.push(issue)
            localStorage.setItem('issues', JSON.stringify(issues))
        }else{
            let issues = JSON.parse(localStorage.getItem('issues'))
            issues.push(issue)
            localStorage.setItem('issues', JSON.stringify(issues))
        }

        document.getElementById('issueInputForm').reset()

        fetchIssues()

        e.preventDefault()
    }

    function setStatusClosed(id){
        let issues = JSON.parse(localStorage.getItem('issues'))
        for(let i=0; i < issues.length; i++){
            if(issues[i].id === id) {
            issues[i].status = "Closed"
        }
        
        }

        localStorage.setItem('issues', JSON.stringify(issues))

        fetchIssues()
    }

    function deleteIssue (id) {
    let issues = JSON.parse(localStorage.getItem('issues'))
    for(let i=0; i < issues.length; i++) {
        if(issues[i].id === id) {
            issues.splice(i,1)
        }
    }

    localStorage.setItem('issues', JSON.stringify(issues))

    fetchIssues()

}