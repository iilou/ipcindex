import sys
import asyncio
import zlib
import pickle

from mihomo import Language, MihomoAPI
from mihomo.models import StarrailInfoParsed
from mihomo.models.v1 import StarrailInfoParsedV1

client = MihomoAPI(language=Language.EN)

async def main(uid):
    data : StarrailInfoParsed = await client.fetch_user_v1(600505603)

    pickle_data = zlib.compress(pickle.dumps(data))
    json_data = data.json(by_alias=True, ensure_ascii=False)
    # print(len(json_data))
    
    # print("pickle data: ", pickle_data)
    print("json data: ", json_data)
    
    
if(len(sys.argv) < 1):
    print("No arg provided: ", type(sys.argv[1]))
    
elif(not isinstance(sys.argv[1], str)):
    print("Invalid arg provided: ", type(sys.argv[1]))
    
elif (len(sys.argv[1]) != 9):
    print("Invalid arg provided: ", sys.argv[1])
    
else: 
    asyncio.run(main(sys.argv[1]))

# print("a")