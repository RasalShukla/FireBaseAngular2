export class Employees
{ 
   constructor(
      public $key:string,
      public name: string,
      public designation: string, 
      public isdeleted:boolean,
      public email:string,
      public phoneNo:string,
      public imageSrc: string,
      public createdBy: string){
    }
    static fromJson({ $key, name, designation, isdeleted, email, phoneNo, imageSrc, createdBy}) {
    return new Employees($key, name, designation,isdeleted, email, phoneNo,  imageSrc,createdBy);
  }
}
