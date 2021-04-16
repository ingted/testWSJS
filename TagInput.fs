namespace TI
open WebSharper
open WebSharper.JavaScript
open WebSharper.JQuery
open WebSharper.UI
open WebSharper.UI.Html
open WebSharper.UI.Client

[<JavaScript; AutoOpen>]
module Resources =
    open WebSharper.Core.Resources
    open WebSharper.JQuery.Resources

    [<Require(typeof<JQuery>)>]
    type TypeAhead() =
        inherit BaseResource("https://twitter.github.io/typeahead.js/releases/latest/typeahead.bundle.js")

    [<Require(typeof<TypeAhead>)>]
    type TagsInput() =
        inherit BaseResource("https://raw.githack.com/bootstrap-tagsinput/bootstrap-tagsinput/master/src/bootstrap-tagsinput.js")

    [<Require(typeof<TypeAhead>)>]
    type TagsInputCSS() =
        inherit BaseResource("https://raw.githack.com/bootstrap-tagsinput/bootstrap-tagsinput/master/src/bootstrap-tagsinput.css")

    [<Require(typeof<TypeAhead>)>]
    type TypeAheadCSS() =
        inherit BaseResource("https://raw.githack.com/bootstrap-tagsinput/bootstrap-tagsinput/master/src/bootstrap-tagsinput-typeahead.css")

[<JavaScript; AutoOpen>]
module JSLib =
    type JQuery with
        [<Require(typeof<Resources.TagsInput>)>]
        [<Require(typeof<Resources.TagsInputCSS>)>]
        [<Require(typeof<Resources.TypeAheadCSS>)>]
        [<Inline "$0.tagsinput({ typeaheadjs: { source: $1  }})">]
        member private this.Ti (findMatches: FuncWithArgs<string * (string [] -> unit), unit>) = X<unit>

        member this.TagInput (onChange: (string * (string [] -> unit)) -> unit) onSelect = 
            do this.Ti <| FuncWithArgs(onChange)
            
            let getValue() =
                this.Val() |> string |> onSelect
            
            this.On("itemAdded", fun _ _ -> getValue())
                .On("itemRemoved", fun _ _ -> getValue())

    [<Inline "$f(1, 2)">]
    let orz (f: obj -> unit) = X<int>


[<JavaScript>]
module Client =
    open JSLib
    let Main0 () =
        let input = input [ attr.id "tags"; attr.``type`` "text"; Attr.Create "data-role" "tagsinput"; attr.value "Amsterdam,Washington,Sydney,Beijing,Cairo"  ] []
        let pre =  pre [ attr.id "preview"; attr.style "margin-top:30px;" ] []
        [ input; pre ]
        |> Seq.cast
        |> Doc.Concat
        |> Doc.RunById "main"
        
        let states =
            [| "Alabama"; "Alaska"; "Arizona"; "Arkansas"; "California";
               "Colorado"; "Connecticut"; "Delaware"; "Florida"; "Georgia"; "Hawaii";
               "Idaho"; "Illinois"; "Indiana"; "Iowa"; "Kansas"; "Kentucky"; "Louisiana";
               "Maine"; "Maryland"; "Massachusetts"; "Michigan"; "Minnesota";
               "Mississippi"; "Missouri"; "Montana"; "Nebraska"; "Nevada"; "New Hampshire";
               "New Jersey"; "New Mexico"; "New York"; "North Carolina"; "North Dakota";
               "Ohio"; "Oklahoma"; "Oregon"; "Pennsylvania"; "Rhode Island";
               "South Carolina"; "South Dakota"; "Tennessee"; "Texas"; "Utah"; "Vermont";
               "Virginia"; "Washington"; "West Virginia"; "Wisconsin"; "Wyoming" |]

        (JQuery.Of("#tags")
              .TagInput (fun (query, cb) -> cb (states |> Array.filter (fun (e: string )-> e.Contains query))) ((pre :?> Elt).SetText)
              ).Ignore
        //div [] []
        ()

    [<JavaScript>]
    let Main () =
        div [][
            Doc.Button "run" [] (fun () -> 
                async {
                    Main0()//.Ignore
                } |> Async.Start
                //()
                )
            ]