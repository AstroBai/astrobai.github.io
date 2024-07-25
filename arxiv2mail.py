import feedparser
from jinja2 import Template

def fetch_arxiv_articles():
    url = 'http://export.arxiv.org/rss/astro-ph.CO'
    feed = feedparser.parse(url)
    articles = []
    for entry in feed.entries:
        article = {
            'title': entry.title,
            'authors': entry.author,
            'summary': entry.summary,
            'link': entry.link
        }
        articles.append(article)
    return articles

def generate_html(articles):
    html_template = """
    <!DOCTYPE html>
    <html>
    <head>
        <link href="custom.css" rel="stylesheet"></link>
        <meta charset="utf-8">
        <title>Daily arXiv astro-ph.CO Articles</title>
        <link rel="icon" href="https://astrobai.github.io/pics/icon.jpg" sizes="16x16">
    </head>
    <body>
        <div class="container">
            <div class="topnav">
                <a class="active" href="https://astrobai.github.io/index.html">Home</a>
                <a href="https://astrobai.github.io/pages/pub.html">Publications</a>
                <a href="https://astrobai.github.io/pages/res.html">Research</a>
                <a href="https://astrobai.github.io/pages/codes.html">Codes</a>
                <a href="https://astrobai.github.io/pages/tk.html">Talks</a>
                <a href="https://astrobai.github.io/pages/cv.html">CV</a>
                <a href="https://astrobai.github.io/pages/nt.html">Notes</a>
                <a href="https://astrobai.github.io/pages/gal.html">Gallery</a>
                <a href="https://astrobai.github.io/pages/lk.html">Links</a>
            </div>
            <div class="content">
                <h1>Daily arXiv astro-ph.CO Articles</h1>
                {% for article in articles %}
                <div class="article">
                    <h2>{{ article.title }}</h2>
                    <p><strong>Authors:</strong> {{ article.authors }}</p>
                    <p><strong>Summary:</strong> {{ article.summary }}</p>
                    <p><a href="{{ article.link }}">Read more</a></p>
                </div>
                <hr>
                {% endfor %}
            </div>
        </div>
    </body>
    </html>
    """
    template = Template(html_template)
    html_content = template.render(articles=articles)
    with open('./pages/arxiv.html', 'w', encoding='utf-8') as file:
        file.write(html_content)

def main():
    articles = fetch_arxiv_articles()
    generate_html(articles)

if __name__ == "__main__":
    main()
