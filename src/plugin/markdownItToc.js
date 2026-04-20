

function markdownItToc(md,options={}){
    let toc_options = {
        //获取层级
        level:[1,2,3,4,5,6]
    }
    Object.assign(toc_options,options);
    //获取目录
    md.core.ruler.push("getToc",function (state){
        md.toc=[];
        let tokens = state.tokens;
        for (let i = 0; i < tokens.length; i++) {
            let token = tokens[i]

            if( token.type ==="heading_open"
                && /^h[\d]{1}$/.test(token.tag)
                && toc_options.level.find(level=>level===parseInt(token.tag.charAt(1)))){
                let cur_obj = Object.assign({
                    title:tokens[i+1].content,
                    children:[],
                    level: token.tag.charAt(1)
                },Object.fromEntries(new Map(token.attrs)))

                md.toc.push(cur_obj);
            }
        }
    })
}

export default  markdownItToc;