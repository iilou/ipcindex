import sys
import asyncio
import zlib
import pickle

from mihomo import Language, MihomoAPI
from mihomo.models import StarrailInfoParsed
from mihomo.models.v1 import StarrailInfoParsedV1

client = MihomoAPI(language=Language.EN)

async def main(uid):
    data : StarrailInfoParsedV1 = await client.fetch_user_v1(int(uid))
    data2 : StarrailInfoParsed = await client.fetch_user(int(uid))
    print(data2)
    
    # cData = await client.get_parsed_api_data(int(uid))
    # print(cData)

    pickle_data = zlib.compress(pickle.dumps(data))
    # print(pickle_data)
    json_data = data2.json(by_alias=True, ensure_ascii=False)
    # print(json_data)
    
    return json_data

def getJSON(uid):
    asyncio.run(main(uid))
