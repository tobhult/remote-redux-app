import React from 'react';
import { connect } from 'react-redux';
import { add } from './redux';
import './Adder.css';

class Adder extends React.Component {
    render() {
        const { value, add } = this.props;

        return (
            <form
                className="Adder"
                onSubmit={e => {
                    e.preventDefault();
                    add(parseInt(this.numberInput.value));
                    this.numberInput.value = '';
                }}
            >
                {value} + <input className="Adder-input" type="number" ref={ref => this.numberInput = ref} />
            </form>
        );
    }
}

const mapStateToProps = (state) => ({
    value: state.foo.value,
});

const mapDispatchToProps = {
    add,
};

export default connect(mapStateToProps, mapDispatchToProps)(Adder);
