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


@app.get("/wordfun", response_class=HTMLResponse)
async def wordfun(request: Request):
    context = {
        "request": request,
        "category": "wordfun"
    }
    return templates.TemplateResponse("wordfun.html", context)


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


@app.get("/digit", response_class=HTMLResponse)
@app.get("/digit/{digit}", response_class=HTMLResponse)
async def digit(request: Request, digit: str | None = 0):
    prev_dgt = int(digit) - 1
    if prev_dgt < 0:
        prev_dgt = 9
    next_dgt = int(digit) + 1
    if next_dgt > 9:
        next_dgt = 0

    context = {
        "request": request,
        "digit": digit,
        "prev": prev_dgt,
        "next": next_dgt,
    }
    return templates.TemplateResponse("digit.html", context)
