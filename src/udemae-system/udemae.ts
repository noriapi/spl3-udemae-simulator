import * as N from "./udemae-name";
import { addSafe, UdemaePoint } from "./udemae-point";

export interface Udemae {
  name: N.UdemaeName;
  point: UdemaePoint;
}

export const compare = (lhs: Udemae, rhs: Udemae) => {
  const result = N.compare(lhs.name, rhs.name);
  if (result !== 0) {
    return result;
  } else {
    return Math.sign(lhs.point - rhs.point);
  }
};

export const fromUdemaeName = (u: N.UdemaeName) => {
  return {
    name: u,
    point: N.initialPoint(u),
  };
};

export const INITIAL_UDEMAE: Udemae = fromUdemaeName({ str: "C-" });

// 次のウデマエに上がれるポイントを返す
// 昇格戦に挑戦可能な状態もしくは、S+50 の場合 undefined を返す
export const nextPoint = (u: Udemae) => {
  if (u.name.str in N.PROMOTE_CHALLENGABLE_POINT) {
    const border =
      N.PROMOTE_CHALLENGABLE_POINT[
        u.name.str as keyof typeof N.PROMOTE_CHALLENGABLE_POINT
      ];
    if (u.point < border) {
      // 昇格戦に挑戦可能になるポイント
      return border;
    } else {
      // 昇格戦に挑戦可能な状態
      return;
    }
  }

  const next = N.next(u.name);
  if (next == null) {
    return;
  }

  return N.initialPoint(next);
};

export const canPromoteChallenge = ({ name, point }: Udemae): boolean => {
  // S+50 なら無理
  if (N.compare(name, { str: "S+", num: 50 }) === 0) {
    return false;
  }

  const { str } = name;

  if (str in N.PROMOTE_CHALLENGABLE_POINT) {
    const p =
      N.PROMOTE_CHALLENGABLE_POINT[
        str as keyof typeof N.PROMOTE_CHALLENGABLE_POINT
      ];
    return point >= p;
  }

  return false;
};

export const payChallengeFee = (udemae: Udemae): Udemae => ({
  ...udemae,
  point: addSafe(udemae.point, -N.CHALLENGE_FEE[udemae.name.str]),
});

// 現在のポイントに合わせてウデマエを正しく更新する
export const updateName = (udemae: Udemae): Udemae => {
  const next = N.nextWithoutPromotion(udemae.name);
  if (next == null) return udemae;

  if (N.initialPoint(next) <= udemae.point) {
    return updateName({ name: next, point: udemae.point });
  } else {
    return udemae;
  }
};

export const addPoints = (udemae: Udemae, pts: UdemaePoint): Udemae =>
  updateName({
    ...udemae,
    point: addSafe(udemae.point, pts),
  });

// 昇格させる
// S+50 だった場合、昇格できないので undefined を返す
export const promote = (udemae: Udemae): Udemae | undefined => {
  const name = N.next(udemae.name);
  if (name == null) {
    return;
  }

  return fromUdemaeName(name);
};
