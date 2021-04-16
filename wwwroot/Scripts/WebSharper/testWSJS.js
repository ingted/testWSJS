(function(Global)
{
 "use strict";
 var testWSJS,Client,TI,JSLib,Client$1,WebSharper,UI,Var$1,Submitter,View,Remoting,AjaxRemotingProvider,Concurrency,Doc,AttrProxy,IntelliFactory,Runtime,List,Client$2,Templates,Arrays;
 testWSJS=Global.testWSJS=Global.testWSJS||{};
 Client=testWSJS.Client=testWSJS.Client||{};
 TI=Global.TI=Global.TI||{};
 JSLib=TI.JSLib=TI.JSLib||{};
 Client$1=TI.Client=TI.Client||{};
 WebSharper=Global.WebSharper;
 UI=WebSharper&&WebSharper.UI;
 Var$1=UI&&UI.Var$1;
 Submitter=UI&&UI.Submitter;
 View=UI&&UI.View;
 Remoting=WebSharper&&WebSharper.Remoting;
 AjaxRemotingProvider=Remoting&&Remoting.AjaxRemotingProvider;
 Concurrency=WebSharper&&WebSharper.Concurrency;
 Doc=UI&&UI.Doc;
 AttrProxy=UI&&UI.AttrProxy;
 IntelliFactory=Global.IntelliFactory;
 Runtime=IntelliFactory&&IntelliFactory.Runtime;
 List=WebSharper&&WebSharper.List;
 Client$2=UI&&UI.Client;
 Templates=Client$2&&Client$2.Templates;
 Arrays=WebSharper&&WebSharper.Arrays;
 Client.Main=function()
 {
  var rvInput,submit,vReversed;
  rvInput=Var$1.Create$1("");
  submit=Submitter.CreateOption(rvInput.get_View());
  vReversed=View.MapAsync(function(a)
  {
   var b;
   return a!=null&&a.$==1?(new AjaxRemotingProvider.New()).Async("testWSJS:testWSJS.Server.DoSomething:89585888",[a.$0]):(b=null,Concurrency.Delay(function()
   {
    return Concurrency.Return("");
   }));
  },submit.view);
  return Doc.Element("div",[],[Doc.Input([],rvInput),Doc.Button("Send",[],function()
  {
   submit.Trigger();
  }),Doc.Element("hr",[],[]),Doc.Element("h4",[AttrProxy.Create("class","text-muted")],[Doc.TextNode("The server responded:")]),Doc.Element("div",[AttrProxy.Create("class","jumbotron")],[Doc.Element("h1",[],[Doc.TextView(vReversed)])])]);
 };
 JSLib["JQuery.TagInput"]=function(_this,onChange,onSelect)
 {
  function getValue()
  {
   onSelect(Global.String(_this.val()));
  }
  _this.tagsinput({
   typeaheadjs:{
    source:Runtime.CreateFuncWithArgs(onChange)
   }
  });
  return _this.on("itemAdded",function()
  {
   return getValue();
  }).on("itemRemoved",function()
  {
   return getValue();
  });
 };
 Client$1.Main=function()
 {
  return Doc.Element("div",[],[Doc.Button("run",[],function()
  {
   var b;
   Concurrency.Start((b=null,Concurrency.Delay(function()
   {
    Client$1.Main0();
    return Concurrency.Zero();
   })),null);
  })]);
 };
 Client$1.Main0=function()
 {
  var input,pre,a,states;
  input=Doc.Element("input",[AttrProxy.Create("id","tags"),AttrProxy.Create("type","text"),AttrProxy.Create("data-role","tagsinput"),AttrProxy.Create("value","Amsterdam,Washington,Sydney,Beijing,Cairo")],[]);
  pre=Doc.Element("pre",[AttrProxy.Create("id","preview"),AttrProxy.Create("style","margin-top:30px;")],[]);
  a=Doc.Concat(List.ofArray([input,pre]));
  Templates.LoadLocalTemplates("");
  Doc.RunById("main",a);
  states=["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"];
  JSLib["JQuery.TagInput"](Global.jQuery("#tags"),function(t)
  {
   var query;
   query=t[0];
   t[1](Arrays.filter(function(e)
   {
    return e.indexOf(query)!=-1;
   },states));
  },function(a$1)
  {
   pre.SetText(a$1);
  });
 };
}(self));
