const BASE_URL = 'http://127.0.0.1:5000/api'

function CupcakesTempaleForHTML(cupcake){

    html_string = ` <div data-cupcake-id = ${cupcake.id}>
                        <li> ${cupcake.flavor}
                            ${cupcake.size}
                            ${cupcake.rating}/10
                            </li>
                            <img src='${cupcake.image}' alt = 'No Image'>  
                            <button id='btnDelete' class='delete-button'>Delete</button>
                    </div>
    `;
    return html_string;
}

async function listCupcakes(){
    const resp = await axios.get(`${BASE_URL}/cupcakes`)
    
    for (let c of resp.data.cupcakes){
        let newCupcake = $(CupcakesTempaleForHTML(c))
        $('#cupcakes-list').append(newCupcake)        
    }
}

$('#new-cupcake-form').on('submit', async function(e){
    e.preventDefault();
    let flavor = $('#flavor').val()
    let size = $('#size').val()
    let rating = $('#rating').val()
    let image = $('#image').val()

    // console.log(`${flavor} ${size} ${rating} ${typeof(image)}`)

    const resp = await axios.post(`${BASE_URL}/cupcakes`,{
        flavor,
        size,
        rating,
        image
    })
    // console.log(resp.data)
    let newCupcake = $(CupcakesTempaleForHTML(resp.data.cupcake))
    $('#cupcakes-list').append(newCupcake)
    $('#new-cupcake-form').trigger('reset')
});


// async function deleteFunc(){
//     // e.preventDefault()
//     let $cupcakeDiv = $(e.target).closest('div')
//     let cupcakeId = $cupcakeDiv.attr('cupcake_id')

//         console.log(cupcakeId)
    
//         await axios.delete(`${BASE_URL}/cupcakes/${cupcakeId}`)
//         $cupcakeDiv.remove()
    // }

// $('#new-cupcake-form').on('click', '.delete-button', async function(e){                         //function does not work. Checked with solution. Can't understand why....
//     e.preventDefault()

//     console.log('cupcakeId')

//     let $cupcakeDiv = $(e.target).closest('div')
//     let cupcakeId = $cupcakeDiv.attr('data-cupcake-id')


//     await axios.delete(`${BASE_URL}/cupcakes/${cupcakeId}`)
//     $cupcakeDiv.remove()
// });

$("#cupcakes-list").on("click", ".delete-button", async function (evt) {                    //turns out I have you use js naming with "-"
    evt.preventDefault();
    let $cupcake = $(evt.target).closest("div");
    let cupcakeId = $cupcake.attr("data-cupcake-id");
  
    await axios.delete(`${BASE_URL}/cupcakes/${cupcakeId}`);
    $cupcake.remove();
  });



$(listCupcakes)