import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import style from '../modal.module.css';
import { getEnergySavedTotal, getEnergyAverage } from '../../../../../services/energyService';

interface Ibuilding {
    name: string,
    tek: string,
    areal: number,
    year: number,
    energimerke: string,
  }

const ProgressBar = (props: {building: string | Ibuilding | undefined,
  place: string, data: string}) => {
  const { category } = useParams<{ category:string }>();
  const [completed, setCompleted] = useState<{value:number | string, type:string}>({ value: 0, type: 'spart' });
  // eslint-disable-next-line no-unused-vars
  const [width, setWidth] = useState<number | null>();
  const { building, place, data } = props;
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchdata = async () => {
      if (data === 'spart') {
        try {
          const response = await getEnergySavedTotal(`${building}`);
          setWidth(response.percentSaved > 0
            ? Math.min(response.percentSaved * 5, 100)
            : 0);
          setCompleted({ value: `${response.percentSaved}%`, type: 'spart' });
        } catch (e) {
          setWidth(null);
          setCompleted({ value: 'Ingen data', type: 'spart' });
        }
      }
      if (data === 'avg') {
        try {
          const response = await getEnergyAverage(`${building}`);
          const responseCategory = await getEnergyAverage(`${category}`);
          const tempWidth = (
            response.averageEnergy[0].average
              / responseCategory.averageEnergy[0].average
          ) * 100;
          setWidth(tempWidth);
          setCompleted({ value: response.averageEnergy[0].average, type: 'avg' });
        } catch (e) {
          setWidth(null);
          setCompleted({ value: 'Ingen data', type: 'avg' });
        }
      }
      setLoading(false);
    };
    fetchdata();
  }, [building, category, data]);

  return (
    <div>
      {isLoading ? (
        <div />
      ) : (
        <div
          className={place === 'left' ? style.barLeft : style.barRight}
          style={{
            width: `${width}%`,
          }}
        >
          {completed.value}
        </div>
      )}
    </div>
  );
};
// s
export default ProgressBar;
