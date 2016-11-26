/// <reference path="typings/knockout.d.ts"/>

 module demo_ambient {
   declare var ko: KnockoutStatic;
   var name = ko.observable('suhail');
   var id = ko.observable(1);
   var guy = {
     id: id,
     fullName: name
   };

   var value: string = guy.fullName();
   console.log(value);
 }

 document.body.innerHTML = "hello";

