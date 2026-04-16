import styled from 'styled-components';
import GlassCard from './GlassCard';
import NeonButton from './NeonButton';

const Form = styled.form`
  margin-top: 1rem;
  display: grid;
  gap: 0.65rem;

  h4 {
    margin: 0;
    font-size: 0.95rem;
  }
`;

const Grid = styled.div`
  display: grid;
  gap: 0.55rem;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
`;

const Field = styled.input`
  width: 100%;
`;

const Select = styled.select`
  width: 100%;
`;

const Muted = styled.p`
  margin: 0;
  color: var(--muted-text);
  font-size: 0.79rem;
`;

const Row = styled.div`
  display: flex;
  gap: 0.55rem;
  flex-wrap: wrap;
`;

function QuickLogForm({
  workoutForm,
  foodForm,
  weightForm,
  setWorkoutForm,
  setFoodForm,
  setWeightForm,
  handleAddWorkout,
  handleAddFood,
  handleAddWeight,
  workoutEstimatedCals,
  currentWorkoutMeta,
  workoutLibrary,
  editingWorkoutId,
  editingFoodId,
  editingWeightId,
  resetWorkoutForm,
  resetFoodForm,
  resetWeightForm
}) {
  return (
    <GlassCard>
      <h3>Quick Log</h3>

      <Form onSubmit={handleAddWorkout}>
        <h4>{editingWorkoutId ? 'Edit Workout' : 'Add Workout'}</h4>
        <Grid>
          <Field type="date" value={workoutForm.date} onChange={(e) => setWorkoutForm((v) => ({ ...v, date: e.target.value }))} />
          <Select value={workoutForm.type} onChange={(e) => setWorkoutForm((v) => ({ ...v, type: e.target.value }))}>
            {workoutLibrary.map((opt) => (
              <option key={opt.name} value={opt.name}>{opt.icon} {opt.name}</option>
            ))}
          </Select>
          <Field type="number" placeholder={`Amount (${currentWorkoutMeta.unit})`} value={workoutForm.amount} onChange={(e) => setWorkoutForm((v) => ({ ...v, amount: e.target.value }))} />
          <Field type="number" min="1" placeholder="Sets" value={workoutForm.sets} onChange={(e) => setWorkoutForm((v) => ({ ...v, sets: e.target.value }))} />
          <Field type="text" value={`${workoutEstimatedCals} kcal (auto)`} readOnly />
        </Grid>
        <Muted>Formula uses MET x body weight x duration. Daily predictions are based on net calorie balance.</Muted>
        <Row>
          <NeonButton type="submit">{editingWorkoutId ? 'Update Workout' : 'Save Workout'}</NeonButton>
          {editingWorkoutId ? <NeonButton type="button" onClick={resetWorkoutForm}>Cancel</NeonButton> : null}
        </Row>
      </Form>

      <Form onSubmit={handleAddFood}>
        <h4>{editingFoodId ? 'Edit Food' : 'Add Food'}</h4>
        <Grid>
          <Field type="date" value={foodForm.date} onChange={(e) => setFoodForm((v) => ({ ...v, date: e.target.value }))} />
          <Field type="text" placeholder="Meal" value={foodForm.meal} onChange={(e) => setFoodForm((v) => ({ ...v, meal: e.target.value }))} />
          <Field type="number" placeholder="Calories consumed" value={foodForm.caloriesConsumed} onChange={(e) => setFoodForm((v) => ({ ...v, caloriesConsumed: e.target.value }))} />
        </Grid>
        <Row>
          <NeonButton type="submit">{editingFoodId ? 'Update Food' : 'Save Food'}</NeonButton>
          {editingFoodId ? <NeonButton type="button" onClick={resetFoodForm}>Cancel</NeonButton> : null}
        </Row>
      </Form>

      <Form onSubmit={handleAddWeight}>
        <h4>{editingWeightId ? 'Edit Weight' : 'Add Weight'}</h4>
        <Grid>
          <Field type="date" value={weightForm.date} onChange={(e) => setWeightForm((v) => ({ ...v, date: e.target.value }))} />
          <Field type="number" step="0.1" placeholder="Weight kg" value={weightForm.weight} onChange={(e) => setWeightForm((v) => ({ ...v, weight: e.target.value }))} />
        </Grid>
        <Row>
          <NeonButton type="submit">{editingWeightId ? 'Update Weight' : 'Save Weight'}</NeonButton>
          {editingWeightId ? <NeonButton type="button" onClick={resetWeightForm}>Cancel</NeonButton> : null}
        </Row>
      </Form>
    </GlassCard>
  );
}

export default QuickLogForm;
