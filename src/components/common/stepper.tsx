import { Stepper, Step, StepLabel, StepConnector, stepConnectorClasses, styled, StepIconProps } from '@mui/material';
import { Check } from '@mui/icons-material';

interface StepperProps {
  activeStep: number;
  steps: string[];
}

const StepLine = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
      left: 'calc(-50% + 16px)',
      right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#2FAF7E',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: '#2FAF7E',
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#eaeaf0',
      borderTopWidth: 3,
      borderRadius: 1,
      ...theme.applyStyles('dark', {
        borderColor: theme.palette.grey[800],
      }),
    },
}));

const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
    ({ theme }) => ({
      color: '#eaeaf0',
      display: 'flex',
      height: 22,
      alignItems: 'center',
      '& .QontoStepIcon-completedIcon': {
        color: '#2FAF7E',
        zIndex: 1,
        fontSize: 18,
      },
      '& .QontoStepIcon-circle': {
        width: 10,
        height: 10,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
      },
      ...theme.applyStyles('dark', {
        color: theme.palette.grey[700],
      }),
      variants: [
        {
          props: ({ ownerState }) => ownerState.active,
          style: {
            color: '#2FAF7E',
          },
        },
      ],
    }),
);
  
function QontoStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}


export default function StepperComponent({ activeStep, steps }: StepperProps){
  return (
    <Stepper activeStep={activeStep} sx={{ marginBottom: 1 }} connector={<StepLine />}>
      {steps.map((label, index) => (
        <Step key={index}>
          <StepLabel StepIconComponent={QontoStepIcon} >{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};
