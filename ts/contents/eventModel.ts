import { query } from "./../lib/database"

//TODO: イベントポイント
export async function addEventPoint(userId: number, basePoint: number, randomPoint: number)
{
	try
	{
		let addAmount = basePoint + Math.floor(Math.random() * randomPoint);
		let result = await query("UPDATE EventPoint SET point = point + ? WHERE id = ?",[addAmount, userId]);

		//キャッシュの更新が必要ならそうする
		//

		//
		return [addAmount];
	}
	catch(ex)
	{
		console.log(ex);
	}
	
	return [];
}
