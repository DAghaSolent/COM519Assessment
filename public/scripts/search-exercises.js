const exerciseView = (exercise) => `

<div class="col-12">
    <div class="card">
        <h5 class="card-header">
        <div class="card-body">
          <ul class="list-group">
               <li class="list-group-item"> Date: ${exercise.date}</li>
                <li class="list-group-item">Exercise Name: ${exercise.exerciseName}</li>
                <li class="list-group-item">Weight: ${exercise.weight}</li>
                <li class="list-group-item">Set & Reps: ${exercise.setAndReps}</li>
                <li class="list-group-item">Comments: ${exercise.comments}</li>
          </ul>
        </div>
      </div>
 </div>
`;


const handleClick = async () => {
    const searchVal = document.querySelector("#searchInput").value;
    const exerciseDomRef = document.querySelector('#exerciseItems');
    try{
        
        const ref = await fetch(`/api/search-exercises/?search=${searchVal}`);
        const searchResults = await ref.json();
        console.log(searchResults);
        let exerciseHtml = []
        searchResults.forEach(exercise => {
             exerciseHtml.push(exerciseView(exercise));
         });
        exerciseDomRef.innerHTML = exerciseHtml.join("");
    }catch (e) {
        console.log(e);
        console.log('could not search api');
    }
}