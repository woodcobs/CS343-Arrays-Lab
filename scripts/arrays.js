let card_count = 0;
let credit_hours = 0;
let credit_hours_pre = 0;

function outputCard(info)
{
    const card_template = ` <div class="col">
                            <div class="card" style="width: 18rem;">
                            <h3 class="card-header">${info.title}</h3>
                            <div class="card-body">
                                <h5 class="card-title">${info.prefix} ${info.number}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                                <p class="card-text">${info.desc}</p>
                                <a href="${info.url}" class="card-link">Card link</a>
                                <a href="#" class="card-link">Another link</a>
                            </div>
                            <div class="card-footer">${info.credits} Credit Hours</div>
                        </div>
                        </div>`
    card_count += 1;
    credit_hours += info.credits;
    document.write(card_template);
}
// 1. instead of creating the cards manually, we should use array functions to convert the data into cards
function printClasses(filter)
{
        data.items.forEach(classinfo => outputCard(classinfo));
}
// 2. maybe we only show those that match the search query?

// add an event listener
/*
const search_button = document.getElementById("search-btn")
const search_bar = document.getElementById("search-bar")

search_button.addEventListener("click", (event) => {
    event.preventDefault();
    printClasses(search_bar.value);  
})
*/
const courseToCard = ({
    prefix,
    number,
    title,
    url,
    desc,
    prereqs,
    credits,
  }) => {
    const prereqLinks = prereqs
      .map((prereq) => `<a href="#" class="card-link">${prereq}</a>`)
      .join();
    const courseTemplate = `<div class="col">
              <div class="card" style="width: 18rem;">
                <h3 class="card-header"><a href="${url}">${title}</a></h3>
                <div class="card-body">
                  <h5 class="card-title">${prefix} ${number}</h5>
                  <p class="card-text">${desc}</p>
                  ${prereqLinks}
                  <div class="card-footer text-muted">
                    ${credits}
                  </div>
                </div>
              </div>
            </div>`;
    return courseTemplate;
  };
  
const resultsContainer = document.querySelector("#filtered-results");
const courseCards = data.items.map(courseToCard);


const filterCourseCard = (markup, query) => {
    console.log(markup.toLowerCase().includes(query.toLowerCase()));
    if (markup.toLowerCase().includes(query.toLowerCase()))
    {
        return markup.toLowerCase()
    }
    return false;
};

const searchField = document.querySelector('input[name="query-text"]');

let filteredCourseCards;

searchField.addEventListener("input", (ev) =>{
    console.log(ev);
    ev.preventDefault();
    console.log("query text is ");

    const queryText = searchField.value;
    console.log(queryText);

    //debugger
    filteredCourseCards = courseCards.filter((card) => {
        filterCourseCard(card, queryText)
    });
    console.log('filteredCourseCards', filteredCourseCards);
    resultsContainer.innerHTML = filteredCourseCards.join("");
    updateCount();
})

// 3. we update the result count and related summary info as we filter
function printMisc() 
{
    const summary_template = `<dl class="summary-info">
                                <dt>Count</dt>
                                <dd><span>${card_count}</span> items</dd>
                                <dt>Cost</dt>
                                <dd><span>${credit_hours}</span> credit-hours + <span>${credit_hours_pre}</span> credit-hours of prereqs</dd>
                                </dl>`
    document.write(summary_template);
}


function updateCount()
{
    const count = document.getElementById("result-count");
    const countValue = filteredCourseCards.length;
    count.innerText = `${countValue} items`;
}


