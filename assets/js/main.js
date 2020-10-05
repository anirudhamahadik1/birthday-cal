function handleFormSubmit(e) {
    e.preventDefault()

    // Get the data from the form.
    let form = e.target
    let data = JSON.parse(form["data"].value)
    let year = form["year"].value

    // Filter data by year.
    let filData = data.filter(item => {
        let d = new Date(item.birthday)
        
        return year == d.getFullYear()
    })

    // Sort filtered data by week days.
    let days = []
    filData.forEach(item => {
        // Get the Initials of the name.
        let name = item.name
        let initials = name.match(/\b\w/g) || [];
        item.initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
        
        // Push the object data as per day of week.
        let d = new Date(item.birthday)
        if(days[d.getDay()] === undefined) {
            days[d.getDay()] = [] // Initialize with an empty array.
        }
        days[d.getDay()].push(item)
    });

    let cal = [] // Initialize Calendar component array.
    // Some 
    let colors = ["red", "green", 'blue', "cyan", "magenta", "yellow", "red", "green", 'blue', "cyan", "magenta", "yellow", "red", "green", 'blue', "cyan", "magenta", "yellow"]
    for(i = 0; i <= 6; i++) {
        let people = [] // Initailize people component array.
        if(days[i] !== undefined) {
            // CSS column class logic.
            let count = days[i].length
            let col = "col"
            if(count <= 1) {
                col = "col-12"
            } else if(count <= 4) {
                    col = "col-6"
                } else if(count <= 9) {
                        col = "col-4"
                    } else if(count <= 16) {
                            col = "col-3"
                        } else {
                                col = "col"
                            }
            
            // Add people component to array.
            days[i].forEach((item, index) => {
                people[index] = `<div class="${col} people" style="background-color:${colors[index]};">${item.initials}</div>`
            })
        }

        // Add calendar component to array.
        cal[i] = `<div class="col">
            <div class="card">
                <div class="card-header">
                    <h4>Mon</h4>
                </div>
                <div class="card-body">
                    <div class="card-body-inner">
                        <div class="row">
                            ${people.join("")}
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    }

    document.querySelector('.calendar').innerHTML = cal.join("") // Display to DOM element.
}