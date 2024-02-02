from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")


templates = Jinja2Templates(directory="templates")

# def https_url_for(request: Request, name: str, **path_params: Any) -> str:
#
#     http_url = request.url_for(name, **path_params)
#
#     # Replace 'http' with 'https'
#     return http_url.replace("http", "https", 1)
#
# templates.env.globals["https_url_for"] = https_url_for
#
# You can then use it in your Jinja2 template like this:
#
# https_url_for(request, "/https/path", search="hi")
# The resulting url should look like https://<domain>/https/path?search=hi.

@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    context = {
        "request": request,
        "category": "home"
    }
    return templates.TemplateResponse("index.html", context)


@app.get("/pixi", response_class=HTMLResponse)
async def pixi(request: Request):
    context = {
        "request": request,
        "category": "pixi"
    }
    return templates.TemplateResponse("pixi.html", context)


@app.get("/counter", response_class=HTMLResponse)
async def counter(request: Request):
    context = {
        "request": request,
        "category": "counter"
    }
    return templates.TemplateResponse("counter.html", context)


@app.get("/items/{item_id}", response_class=HTMLResponse)
async def read_item(request: Request, item_id: str):
    context = {
        "request": request,
        "id": item_id,
        "category": "item"
    }
    return templates.TemplateResponse("item.html", context)