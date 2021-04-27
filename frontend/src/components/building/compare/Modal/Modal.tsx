import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import style from './modal.module.css';
import CategoryUsage from './graphs/CategoryUsage';
import closeImage from '../../../../assets/png/close.png';
import ProgressBar from './graphs/ProgressBar';
import check from '../../../../assets/png/bi_check.png';
import cross from '../../../../assets/png/entypo_cross.png';
// s
interface Ibuilding {
  name: string,
  tek: string,
  areal: number,
  year: number,
  energimerke: string,
}

function Modal(props: { onChange: any, compareBuilding: Ibuilding | undefined }) {
  const { id } = useParams<{ id: string }>();
  const { compareBuilding } = props;
  const [isLoading, setLoading] = useState(true);
  const [allUpgrades, setUpgrades] = useState(['']);
  const [currentBuildingUpgrade, setCrurrentBuildingUpgrades] = useState([3]);
  const [otherBuildingUpgrade, setOtherBuildingUpgrades] = useState([3]);

  const closeModal = () => {
    props.onChange();
  };

  const getIcon = (building: number[], index: number) => {
    if (currentBuildingUpgrade[index] === 0 && otherBuildingUpgrade[index] === 0) {
      return (<input type="image" alt="check" src={check} />);
    }
    if (building[index] === 1) {
      return (<input type="image" alt="check" src={check} />);
    }
    return (<input type="image" alt="check" src={cross} />);
  };

  const setIcons = () => {
    const arr = [];
    let i = 0;
    while (i <= 2) {
      i += 1;
      const a = Math.floor(Math.random() * 2);
      arr.push(a);
    }
    return arr;
  };
  useEffect(() => {
    const UpgradeItem = [
      'Varmepumpe',
      'Etterisolasjon',
      'Bytte vindu',
      'Nattsenking',
      'Tetningslister',
      'Varmegjenvinning',
      'Solcelleanlegg',
      'LED-lys',
    ];
    const randomUpgrade = () => {
      let i = 0;
      const arr: string[] = [];
      const numb = Math.floor(Math.random() * 3.0);
      while (i <= numb) {
        const rand = Math.floor(Math.random() * 8);
        if (!(arr.includes(UpgradeItem[rand]))) {
          arr.push(UpgradeItem[rand]);
        }
        i += 1;
      }
      setUpgrades(arr);
      setCrurrentBuildingUpgrades(setIcons());
      setOtherBuildingUpgrades(setIcons());
    };
    randomUpgrade();
    setLoading(false);
  }, []);
  return (
    <div>
      {isLoading ? (
        <div />
      ) : (
        <div id={style.wrapper}>
          <input type="image" onClick={closeModal} alt="close" src={closeImage} className={style.closeImage} />
          <h1>
            Sammenlign
            {' '}
            {id}
            {' '}
            og
            {' '}
            {compareBuilding}
            {' '}
          </h1>
          <div id={style.compareUsage}>
            <CategoryUsage sendBuilding={id} sendCompareBuilding={compareBuilding} />
          </div>
          <div>
            <table style={{ margin: 'auto' }}>
              <tbody>
                <tr>
                  <td className={style.left}>
                    <h2 className={style.row1}>
                      {' '}
                      {id}
                      {' '}
                    </h2>
                  </td>
                  <td />
                  <td className={style.right}>
                    <h2 className={style.row1}>
                      {' '}
                      {compareBuilding}
                      {' '}
                    </h2>
                  </td>
                </tr>
                <tr>
                  <td className={style.left}>
                    <p>
                      {' '}
                      Byggeår: 2012
                      {'   '}
                      km²: 1049
                    </p>
                  </td>
                  <td />
                  <td className={style.right}>
                    <p>
                      {' '}
                      Byggeår: 2012
                      {'   '}
                      km²: 1049
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className={style.left}>
                    <ProgressBar building={id} place="left" data="avg" />
                  </td>
                  <td className={style.middle}>
                    <p>
                      Gjennomsnittlig energiforbruk
                    </p>
                  </td>
                  <td className={style.right}>
                    <ProgressBar building={compareBuilding} place="right" data="avg" />
                  </td>
                </tr>
                <tr>
                  <td className={style.left}>
                    <ProgressBar building={id} place="left" data="spart" />
                  </td>
                  <td className={style.middle}>
                    <p>
                      Spart Sammenlignet med i fjor
                    </p>
                  </td>
                  <td className={style.right}>
                    <ProgressBar building={compareBuilding} place="right" data="spart" />
                  </td>
                </tr>
                {allUpgrades.map((_upgrade, index) => (
                  <tr>
                    <td>
                      <div style={{ marginLeft: 'auto', width: '40px' }}>
                        {getIcon(currentBuildingUpgrade, index)}
                      </div>
                    </td>
                    <td className={style.middle}>
                      <p>
                        {_upgrade}
                      </p>
                    </td>
                    <td>
                      <div style={{ width: '40px' }}>
                        {getIcon(otherBuildingUpgrade, index)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
