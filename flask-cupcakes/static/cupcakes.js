const BASE_URL = 'http://127.0.0.1:5000/api'

function CupcakesTempaleForHTML(cupcake){

    html_string = ` <div cupcake_id = ${cupcake.id}>
                        <li> ${cupcake.flavor}
                            ${cupcake.size}
                            ${cupcake.rating}/10
                            </li>
                            <img src='${cupcake.image}' alt = 'No Image'>  
                            <button id='btnDelete' class='btn btn-danger'>Delete</button>
                    </div>
    `;
    return html_string;
}

async function listCupcakes(){
    const resp = await axios.get(`${BASE_URL}/cupcakes`)
    
 

    for (let c of resp.data.cupcakes){
        let newCupcake = $(CupcakesTempaleForHTML(c))
        $('#list_cupcakes').append(newCupcake)        
    }
}



$('#form_cupcake').on('submit', async function(e){
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
    $('#list_cupcake').append(newCupcake)
    $('#form_cupcake').trigger('reset')
});


// async function deleteFunc(){
//     // e.preventDefault()
//     let $cupcakeDiv = $(e.target).closest('div')
//     let cupcakeId = $cupcakeDiv.attr('cupcake_id')

//         console.log(cupcakeId)
    
//         await axios.delete(`${BASE_URL}/cupcakes/${cupcakeId}`)
//         $cupcakeDiv.remove()
    // }

// $('#form_cupcake').on('click', '#btnDelete', async function(e){                         //function does not work. Checked with solution. Can't understand why....
//     e.preventDefault()

//     let $cupcakeDiv = $(e.target).closest('div')
//     let cupcakeId = $cupcakeDiv.attr('cupcake_id')

//     // console.log(cupcakeId)

//     await axios.delete(`${BASE_URL}/cupcakes/${cupcakeId}`)
//     $cupcakeDiv.remove()
// });

listCupcakes()