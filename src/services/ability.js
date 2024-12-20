import { createMongoAbility } from '@casl/ability';
/**
 action 描述可以執行的操作的字串
  1.manage: 全面控制，匹配所有操作
  2.read: 查看或讀取的權限
  3.create: 創建新資源的權限
  4.update: 修改資源的權限
  5.delete: 刪除資源的權限
*/

/**
 subject 是描述授權的資源類型（或對象）的字串或類型
*/

/**
 fields 更複雜的操作
*/

/**
 owner: 看 新增 修改 刪除
 firstPick: 看 修改
 secondPick: 看
*/

const rulesForRole = {
  owner: [{ action: 'manage', subject: 'all' }],
  firstPick: [
    { action: 'read', subject: 'schedule' },
    { action: 'update', subject: 'schedule' },
  ],
  secondPick: [
    { action: 'read', subject: 'schedule' },
  ],
};

export const roles = Object.keys(rulesForRole);

const defaultRole = 'owner';
export const ability = createMongoAbility(rulesForRole[defaultRole]);

// 清除ability當前rule, 換新的rule
export const setAbilityForRole = (role) => {
  const rules = rulesForRole[role] || [];
  ability.update(rules);
};

export const canPerform = (action, subject) => {
  // can(action: 欲檢查的行為, subject: 欲操作的對象, field: [欲操作的字段])
  return ability.can(action, subject)
};
