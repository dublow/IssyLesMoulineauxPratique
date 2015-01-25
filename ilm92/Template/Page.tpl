@model ilm92.Models.InteretModel

@{
    ViewBag.Title = "Index";
    Layout = null;
    var icon = ilm92.Commons.Helper.IsProd == "true" ? "/IssyInteret/Images/favicon.png" : "/Images/favicon.png";
}
<!DOCTYPE html>
<html lang="fr">
<head>
    <title>Issy les Moulineaux - Points d'intérêt - @Model.Fields.Titre</title>
    <link rel="icon" href="@icon">

    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Affiche les points d'intérêt sous forme de liste et de lieu géolocalisés d'Issy-les-Moulineaux." />
    <meta name="keywords" content="Issy-les-Moulineaux, Hauts-de-Seine, point d'intérêts, open-data, opendata, geolocalisation, geolocalise, données publiques, jeu de données, poi" />
</head>
<body>
    <h1>@Model.Fields.Titre</h1>
    <h3>@Model.Fields.Description</h3>
    <p><b>Catégorie: </b> @string.Format("{0}/{1}/{2}", Model.Fields.Categorie1, Model.Fields.Categorie2, Model.Fields.Categorie3)</p>
    <address>
        <b>Url de la page: </b> <a href="@Model.Fields.Url">@Model.Fields.Url</a><br>
        <b>Adresse Postale: </b> @Model.Fields.Adresse @Model.Fields.CodePostal @Model.Fields.Ville<br>
        @if (!string.IsNullOrEmpty(Model.Fields.Email)) {<b>Adresse Email: </b> <a href="mailto:@Model.Fields.Email">@Model.Fields.Email</a><br>}
        <b>Numéro de téléphone: </b> @Model.Fields.Telephone<br>
    </address>
</body>
</html>


