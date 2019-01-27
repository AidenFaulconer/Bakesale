const apiHost = 'https://bakesaleforgood.com';
//used to help seperate the main url from the api 

//ajax is used here to handle back-end reequests and responses used in conjunction with bakesaleforgood's API
//bakesaleforgood's API is based around JSON, requests will be requesting JSON information
//JSON information is displayed in DealDetail
//

export default {
	async fetchInitialDeals(){
		try{
			const response = await fetch(apiHost +'/api/deals');
			const responseJson = await response.json();
			return responseJson;
		} catch(error){
			console.error(error);
		}
	},
	async fetchDealDetail(dealId){
		try{
			const response = await fetch(apiHost +'/api/deals/' +dealId);
			const responseJson = await response.json();
			return responseJson;
		} catch(error){
			console.error(error);
		}
	},
    async fetchDealsSearchResults(searchTerm) {
        try {
            const response = await fetch(apiHost + '/api/deals?searchTerm=' + searchTerm);
            const responseJson = await response.json();
            return responseJson;
        } catch (error) {
            console.error(error);
        }
    }

};
