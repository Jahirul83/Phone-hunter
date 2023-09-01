// console.log('phone.js');

const loadPhone = async (searchText='13',isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);

    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhone(phones,isShowAll);

}

const displayPhone = (phones,isShowAll) => {
    // console.log(phones);
    const phoneContainer = document.getElementById('phone-container');
    // clear card container
    phoneContainer.textContent = '';

    // console.log(phones.length);

    // display show all btn if there are more than 10 phone.
    const showAllContainer = document.getElementById('show-all-container');
    if (phones.length > 10 && !isShowAll) {
        showAllContainer.classList.remove('hidden');

    }
    else {
        showAllContainer.classList.add('hidden')
    }

    // console.log('is show all',isShowAll)

    // display 10 phone if not show all
    if(!isShowAll)
    {
        phones = phones.slice(0, 10)
    }

    phones.forEach(phone => {
        // console.log(phone);
        const phoneCard = document.createElement('div');

        phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`;

        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
            <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show details</button>
            </div>
        </div>
        
        `
        phoneContainer.appendChild(phoneCard);


    });
    // hiding loading spinner
    toggleLoadingSpinner(false);


}

// handle show details

const handleShowDetails = async (id) => {
    console.log('show details clicked',id);
    // load data

    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);

    const data = await res.json();
    const phone = data.data;

    showDetailsModal(phone);

}

const showDetailsModal = (phone) =>
{
    console.log(phone)
    show_details_modal.showModal();

    const phoneName = document.getElementById('show-details-phone-name');
    phoneName.innerText = phone.name;

    const showDetailsContainer = document.getElementById('show-details-container');

    showDetailsContainer.innerHTML=`

    <img src="${phone.image}" alt="">
    <p><span>Storage: </span>${phone?.mainFeatures?.storage}</p>
    <p><span>GPS: </span>${phone?.others?.GPS || 'No GPS'}</p>
    
    `

}

// handle search

const handleSearch = (isShowAll) => {

    toggleLoadingSpinner(true);

    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText,isShowAll);
}


const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner-id');
    if(isLoading)
    {
        loadingSpinner.classList.remove('hidden');
    }
    else
    {
        loadingSpinner.classList.add('hidden');
    }
}

// handle show all

const handleShowAll = () =>{

    handleSearch(true);

}

loadPhone();