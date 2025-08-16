  const form=document.querySelector("#todoAddForm");
    const addinput=document.querySelector("#todoName");
      const todolist=document.querySelector(".list-group")
   
      const firsCardBody=document.querySelectorAll(".card-body")[0];
      const SecondCardBody=document.querySelectorAll(".card-body")[1];
      const clearButton=document.querySelector("#clearButton");
      const todoSearch=document.querySelector("#todoSearch");
      const alertdiv=document.querySelector(".al");
      
      let todoArray=[];
      runEvents();

   function runEvents(){
      form.addEventListener("submit",todoEkleme);
      document.addEventListener("DOMContentLoaded", gecmisVerileriUIdegöster);
      SecondCardBody.addEventListener("click",todoRemoveUI)
      clearButton.addEventListener("click",allTodoRemoveUI)
      todoSearch.addEventListener("keyup",arama)
    
   }

   

  function todoEkleme(e){
     e.preventDefault();
     const metin=addinput.value.trim();
     if(metin=="" || metin==null){
        alertt("warning","lutfen todo giriniz");
     }
     else{
         
     addTodoToIU(metin);
     addToStrange(metin);
     alertt("success","todo başarılı");
    
     



     }
      
     addinput.value=""
    
  }

  function addTodoToIU(toddo){
     const li=document.createElement("li");
      li.textContent=toddo;
      li.className="list-group-item d-flex justify-content-between";

      const i=document.createElement("i");
      const a=document.createElement("a");
      a.className="delete-item";
      a.href="#";
      i.className="fa fa-remove";
      a.appendChild(i);
      li.appendChild(a);
      todolist.appendChild(li);
  }
  
 
   
   function addToStrange(todo){
     checkArray();
     todoArray.push(todo);
      localStorage.setItem("todoArray", JSON.stringify(todoArray)); 

   }
 



   function checkArray(){

    if((localStorage.getItem("todoArray"))===null)
    {todoArray=[]}
    else{
           todoArray=JSON.parse(localStorage.getItem("todoArray"));
    }
    

   }
 
   function alertt(type,val){
      const divv=document.createElement("div");
      firsCardBody.appendChild(divv);
    // divv.className="alert alert-"+type; 
       divv.className = `alert alert-${type} fade show`;
     divv.textContent=val;
  
       setTimeout(() => {
    divv.classList.remove("show"); // fade-out başlar
  }, 2000);

  // 3 saniye sonra tamamen kaldır
  setTimeout(() => {
    divv.remove();
  }, 3000);
         
   }

function gecmisVerileriUIdegöster(){
  checkArray();
 todoArray.forEach(function(x) {
    addTodoToIU(x);
    
});

}


function todoRemoveUI(e){
      if(e.target.className=="fa fa-remove"){
         const lii = e.target.parentElement.parentElement;
         lii.remove();
         alertt("dark","todo basarıyla kaldırıldı");
         todoRemoveStorage(lii.textContent);
      }
   }

   function todoRemoveStorage(todotext){
      checkArray();

       todoArray.forEach (function(element,index){
           if(element===todotext){
             todoArray.splice(index,1);
           }
          
       })
       localStorage.setItem("todoArray",JSON.stringify(todoArray));
  
       
   }
  
   function allTodoRemoveUI(e){
      const todolistesi=document.querySelectorAll(".list-group-item");
      if(todolistesi.length>0){
         todolistesi.forEach(function(todo) {
            todo.remove();
           
            
         });
          todoArray=[];
            localStorage.setItem("todoArray",JSON.stringify(todoArray));
         alertt("success","todo listesi basarıyla silindi");
      }
      else{
             alertt("warning","Silinecek todo listesi bulunamadı");
      }
      }
      
      function arama(){
          const searchText = todoSearch.value.toLowerCase().trim;
          todoliste=document.querySelectorAll(".list-group-item");

          if(todolist.length>0){
              todoArray.forEach(function(x) {
                
               if(x.textContent.toLowerCase().trim.includes(searchText)){
                    x.setAttiribute("style","display : blok");
               }
               else{
                    x.setAttiribute("style","display : none ");
               }
           
        
           });
          }
         
         
          
          
       

      }
   

      

