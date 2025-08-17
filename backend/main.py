import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

class Item(BaseModel):
    name: str

class Items(BaseModel):
    items: List[Item]

app = FastAPI()

origins = [
    "http://localhost:8000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True, 
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory database for items. Before production
items_database = {"items": []}

@app.get("/items", response_model=Items)
async def get_items():
    return Items(items=items_database["items"]) 


@app.post("/items", response_model=Item)
async def add_item(item: Item):
    items_database["items"].append(item)
    return item

# endpoint for deleting an item
@app.delete("/items/{item_name}", response_model=Item)
async def delete_item(item_name: str):
    for item in items_database["items"]:
        if item.name == item_name:
            items_database["items"].remove(item)
            return item
    return {"error": "Item not found"}



if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)