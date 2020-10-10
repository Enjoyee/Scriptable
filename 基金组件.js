// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: pink; icon-glyph: heartbeat;

/*
 * Author: Enjoyee
 * Github: https://github.com/Enjoyee
 * 本脚本使用了@Gideon_Senku的Env.scriptable，感谢！
 */

const $ = importModule("Env");
var fid = 202015; // 基金ID

async function getFund() {
  const fundRequest = {
    url: `https://api.doctorxiong.club/v1/fund?code=${fid}`,
  };
  const res = await $.get(fundRequest);
  log(res);
  return res;
}

getf
