

export async function GET(req, res){
    return Response.json({msg: "Got your request"})
}

export async function POST(req,res){
    const response = await req.json()
    console.log(response)
    return Response.json({msg: "Got your request"})
}