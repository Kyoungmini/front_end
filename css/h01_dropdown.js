function ClassControll(selector){
    this.doms=document.querySelectorAll(selector);
    this.add=function(className){
        for(const dom of this.doms){
            dom.classList.add(className);
        }
    }
    this.remove=function(className){
        for(const dom of this.doms){
            dom.classList.remove(className);
        }
    }
}

addActive.onclick=function(){
    new ClassControll(".dropdown_active .dropdown_btn").add("active");
}
removeActive.onclick=function(){
    new ClassControll(".dropdown_active .dropdown_btn").remove("active");
}

const dropdown_bnts=document.querySelectorAll(".dropdown_active .dropdown_btn");
for(const btn of  dropdown_bnts){
    btn.onclick=function(e){
        if( e.target.classList.contains("active")){
            e.target.classList.remove("active");

        }else{
            e.target.classList.add("active");
        }
    }
}