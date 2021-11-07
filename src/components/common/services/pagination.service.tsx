export default class PaginationService {




    getListRange(listLength: any,pageSize: any,currentPage: any){
        let indexFloor;
        let indexCeil;

        let numOfPages = Math.ceil(listLength/pageSize)
        if(numOfPages < currentPage){
            // Throw an error
        }

        indexFloor = (currentPage-1)*pageSize
        indexCeil = currentPage*pageSize-1

        return {indexFloor,indexCeil}

    }
}