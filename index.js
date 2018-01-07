window.onload = function(){
  //  builder();
  test();
  console.log(Bwe.browser());
  console.log(navigator.userAgent);

  // let field = Bwe.getEl("#myinput");
  // let val = field.attr("id")
  // console.log("val:" + val);
  // let text = Bwe.getEl("#thisone").text();
  // console.log("text:" + text);
  // let json = field.elData();
  // console.log(json);
  //field.del();
  console.log("mobile:" + Bwe.isMobile());

  // Bwe.getEl("#thisone").addChild({
  //   tag : "div",
  //   txt : "i was added"
  // }, "url:cdf.com");
}

function test(){
  let a = new Comp({
    tag : "div",
    id : "thisone",
    class : "myclass",
    data : {
      url : "abc.com",
    },
    txt : "{(text)}-inbetween-{(text)}",
    children : [
      {
        tag : "div",
        id : "test",
        txt : "test",
        css : {
          height : "1000px",
        }
      },
      {
        tag : "button",
        txt : "toggle scroll",
        on : {
          click : function(){
            console.log("scrollable:" + !Bwe.isScrollable);
            Bwe.scrollable();
          },
          mouseover : function(){
            console.log("mouse over");
          },
        },
      },
      {
        tag : "input",
        id : "myinput",
        class : "myclass second",
        value : "text",
        placeholder : "enter text",
        data : {
          url : "cdf.com",
          place : "{(text)}"
        }
      },
      {
        tag : "ul",
        children : Bwe.genList([
          "item {(text)}",
          "item 2",
          "item 3"
        ])
      },
      {
        tag : "table",
        children : Bwe.genTable(
          ["heading 1", "heading 2"],
          [
            ["row 1 item 1", "row 1 item 2"],
            ["row 2 item 1", "row 2 item 2"],
          ]
        )
      },
      {
        tag : "div",
        style : "height:{(h)}px;"
      },
      {
        tag : "button",
        txt : "scroll up",
        id : "jog",
        on : {
          click : function(){
            Bwe.getEl("#myinput").scrollTo();
          }
        }
      },
      {
        tag : "button",
        txt : "add values",
        on : {
          click : function(){
            Bwe.setUrlValues({
              key : "v",
              other : "a b c"
            });
          }
        }
      },
      {
        tag : "button",
        txt : "clear values",
        on : {
          click : function(){
            let vals = Bwe.getUrlValues();
            console.log(vals);
            for(let key in vals){
              vals[key] = "";
            }
            Bwe.setUrlValues(vals);
          }
        }
      }
    ]
  });

  a.addChild({
    tag : "div",
    txt : "i am from addChild",
  }, "url:cdf.com", false);

  a.render("body", {text : "im a templete", h : 2000});
  Bwe.each(".myclass", function(el){
    let url = el.data("url");
    if(url!==null)
      console.log(el.visible());
  });

  let c = Bwe.getEl("#myinput");
  //c.visible(false);
  let offset = c.prop("offsetTop");
  c.addCls('tree');
  c.delCls("second");
  console.log(c.prop("className"));
  c.active();

  let b = a.clone();
  b.data = { tag : "div", txt : "meme"};
  //b.render("body", "set");

  Bwe.ajax({
    url : "php/test.php",
    type : "POST",
    data : {
      key : "value",
      other : "two"
    },
    success : function(result){
      console.log("sucess - " + result);
    },
    error : function(msg, errorCode){
      console.log(errorCode +" : " + msg);
    }
  });
}
