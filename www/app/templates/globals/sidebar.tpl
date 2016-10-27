<div id="header"><h2><3</h2></div>
<div>
    <% if (auth === true) { %>
    <p><a href="/">index</a></p>
    <p><a href="upload">upload</a></p>
    <p><a href="spam">spam</a></p>
    <p><a href="ports">ports</a></p>
    <p><a href="files">files</a></p>
    <p><a href="logout">logout</a></p>
    <% } else { %>
    <p><a href="login">login</a></p>
    <% } %>
</div>